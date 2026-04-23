import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


# SiliconFlow is OpenAI-compatible.
# Default base URL: https://api.siliconflow.cn/v1
UPSTREAM_BASE_URL = os.environ.get("UPSTREAM_BASE_URL", "https://api.siliconflow.cn/v1").rstrip("/")
UPSTREAM_CHAT_ENDPOINT = f"{UPSTREAM_BASE_URL}/chat/completions"


def _read_json(rfile, length: int):
    raw = rfile.read(length) if length > 0 else b"{}"
    try:
        return json.loads(raw.decode("utf-8"))
    except Exception:
        return {}


class Handler(BaseHTTPRequestHandler):
    def _send(self, code: int, payload: dict):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()

    def do_POST(self):
        if self.path == "/health":
            api_key = os.environ.get("SILICONFLOW_API_KEY", "").strip() or os.environ.get("OPENAI_API_KEY", "").strip()
            if not api_key:
                self._send(
                    400,
                    {
                        "ok": False,
                        "error": "missing_api_key",
                        "message": "Set env SILICONFLOW_API_KEY (or OPENAI_API_KEY as fallback)",
                    },
                )
                return

            req = Request(
                f"{UPSTREAM_BASE_URL}/user/info",
                headers={"Authorization": f"Bearer {api_key}"},
                method="GET",
            )
            try:
                with urlopen(req, timeout=20) as resp:
                    out = json.loads(resp.read().decode("utf-8"))
            except HTTPError as e:
                try:
                    body = e.read().decode("utf-8")
                except Exception:
                    body = ""
                try:
                    j = json.loads(body) if body else {}
                except Exception:
                    j = {}
                self._send(
                    200,
                    {
                        "ok": False,
                        "status": int(getattr(e, "code", 0) or 0),
                        "message": str(e),
                        "upstream": j or body,
                        "upstream_url": f"{UPSTREAM_BASE_URL}/user/info",
                    },
                )
                return
            except Exception as e:
                self._send(200, {"ok": False, "error": "health_error", "message": str(e)})
                return

            self._send(200, {"ok": True, "upstream_url": f"{UPSTREAM_BASE_URL}/user/info", "data": out})
            return

        if self.path != "/followup":
            self._send(404, {"error": "not_found"})
            return

        # Prefer SiliconFlow key env; fallback to OPENAI_API_KEY for compatibility.
        api_key = os.environ.get("SILICONFLOW_API_KEY", "").strip() or os.environ.get("OPENAI_API_KEY", "").strip()
        if not api_key:
            self._send(
                400,
                {
                    "error": "missing_api_key",
                    "message": "Set env SILICONFLOW_API_KEY (or OPENAI_API_KEY as fallback)",
                },
            )
            return

        length = int(self.headers.get("Content-Length", "0") or "0")
        data = _read_json(self.rfile, length)
        client_name = str(data.get("clientName") or "您好").strip()
        client_mbti = str(data.get("clientMbti") or "").strip().upper()
        sales_mbti = str(data.get("salesMbti") or "").strip().upper()

        model = str(data.get("model") or "gpt-4o").strip()
        temperature = data.get("temperature")
        if not isinstance(temperature, (int, float)):
            temperature = 0.7

        payload = {
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "你是Tiffany导购跟进文案专家。输出必须是中文一句话，不要换行，不要表情符号。"
                        "总字数严格40字以内。语气高雅克制。需根据MBTI差异：NF偏情感共鸣，NT偏专业致敬，"
                        "SJ偏安心背书，SP偏体验审美。开头须为：'[称呼]，感谢您今天光临Tiffany店铺'。"
                    ),
                },
                {
                    "role": "user",
                    "content": f"称呼：{client_name}；客人MBTI：{client_mbti}；导购MBTI：{sales_mbti}。只输出最终文案。",
                },
            ],
            "temperature": float(temperature),
        }

        req = Request(
            UPSTREAM_CHAT_ENDPOINT,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {api_key}",
            },
            method="POST",
        )

        try:
            with urlopen(req, timeout=30) as resp:
                out = json.loads(resp.read().decode("utf-8"))
        except HTTPError as e:
            # Read upstream error payload (usually JSON with details)
            try:
                body = e.read().decode("utf-8")
            except Exception:
                body = ""
            try:
                j = json.loads(body) if body else {}
            except Exception:
                j = {}
            self._send(
                502,
                {
                    "error": "upstream_http_error",
                    "status": int(getattr(e, "code", 0) or 0),
                    "message": str(e),
                    "upstream": j or body,
                },
            )
            return
        except URLError as e:
            self._send(502, {"error": "upstream_url_error", "message": str(e)})
            return
        except Exception as e:
            self._send(502, {"error": "upstream_error", "message": str(e)})
            return

        try:
            text = out["choices"][0]["message"]["content"]
        except Exception:
            self._send(502, {"error": "bad_upstream_response", "raw": out})
            return

        self._send(200, {"text": text})


def main():
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", "8787"))
    server = HTTPServer((host, port), Handler)
    print(f"Proxy listening on http://{host}:{port}/followup")
    print(f"Upstream: {UPSTREAM_CHAT_ENDPOINT}")
    server.serve_forever()


if __name__ == "__main__":
    main()

