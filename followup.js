// followup.js — 与 followuplogic.js 拼装跟进话术；挂到 window
(function () {
  "use strict";

  const BLAND_PATTERNS = [
    { re: /祝您生活愉快[。！？…]?/g, rep: "" },
    { re: /很高兴为[您你]服务[。！？…]?/g, rep: "" },
    { re: /很高兴[能可]?为[您你][^。！\n]{0,12}服务[。！？…]?/g, rep: "" },
    { re: /如有[任何]?需要[,，]?\s*请?随时?联系[。！？…]?/g, rep: "有事微信我就行。" },
    { re: /随?时?与[我您]?联系[。！？…]?/g, rep: "微信喊我就行。" },
  ];

  function normMbti(s) {
    return String(s || "")
      .trim()
      .toUpperCase();
  }

  function isValidMbti(t) {
    return /^[EI][SN][TF][JP]$/.test(t);
  }

  function stripBlandServiceTone(text) {
    let out = String(text || "");
    for (const { re, rep } of BLAND_PATTERNS) {
      out = out.replace(re, rep);
    }
    return out
      .replace(/[。]{2,}/g, "。")
      .replace(/[\s\n]+/g, "")
      .trim();
  }

  /**
   * 拼装：「称呼，」+ getGreeting + getCoreMessage + getClosing
   * @param {string} 称呼
   * @param {string} clientMbti
   * @param {string} salesMbti
   * @param {{ rephrase?: boolean }} [opts] rephrase：换个说法，随机尾句 + 多组兜底/分支轮换
   */
  function composeFollowUp(称呼, clientMbti, salesMbti, opts) {
    const L = window.followUpLogic;
    if (!L || typeof L.getGreeting !== "function")
      throw new Error("未加载 followuplogic.js（需要 window.followUpLogic）。");

    const c = normMbti(clientMbti);
    const s = normMbti(salesMbti);
    const rephrase = !!(opts && opts.rephrase);
    const name = (称呼 || "您好").trim() || "您好";

    if (!isValidMbti(c) || !isValidMbti(s)) {
      const g = L.getGreeting("INFP");
      const cl = L.getClosing({ rephrase: true });
      const core =
        "我这边更看细节、也讲实在。您要全国清洗、手寸想再对一遍，发我微信，咱们一项项落地。";
      const full0 = name + "，" + g + core + cl;
      const fullText = stripBlandServiceTone(full0);
      return {
        fullText: fullText,
        parts: { open: name + "，", greeting: g, core, close: cl },
        meta: { invalidTypes: true, totalLen: fullText.length, midLen: core.length },
        warning: "MBTI 无效，已用兜底语气组合一版。",
      };
    }

    const g = L.getGreeting(c);
    const core = L.getCoreMessage(s, c, { rephrase });
    const cl = L.getClosing({ rephrase });
    const fullText = stripBlandServiceTone(name + "，" + g + core + cl);

    return {
      fullText: fullText,
      parts: {
        open: name + "，",
        greeting: g,
        core,
        close: cl,
      },
      meta: {
        totalLen: fullText.length,
        midLen: core.length,
        rephrase,
      },
    };
  }

  async function generateFollowUp(clientName, clientMbti, salesMbti, opts) {
    return composeFollowUp(clientName, clientMbti, salesMbti, opts).fullText;
  }

  window.generateFollowUp = generateFollowUp;
  window.composeFollowUp = composeFollowUp;
  // 兼容历史代码里曾使用的名称
  window.followupCompose = function (a, b, c, opts) {
    return composeFollowUp(a, b, c, opts || {});
  };
})();
