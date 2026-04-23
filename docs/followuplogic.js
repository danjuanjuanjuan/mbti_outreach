// followuplogic — 跟进度话术子逻辑（<script src> 引入 → window.followUpLogic）
(function () {
  "use strict";

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const followUpLogic = {
    /** 开头：N 或 P 走「光临」，其余走「购买」（与您提供的 /N|P/ 判断一致） */
    getGreeting: function (clientType) {
      const t = String(clientType || "").toUpperCase();
      const isEmotional = /N|P/.test(t);
      return isEmotional ? "感谢您今天的光临和相遇。" : "感谢您今天的购买和相遇。";
    },

    /**
     * 中间：性格对撞 + 同频 + 多组兜底，便于「换个说法」时随机换一版
     * @param {string} salesType
     * @param {string} clientType
     * @param {{ rephrase?: boolean }} [opts]
     */
    getCoreMessage: function (salesType, clientType, opts) {
      const s = String(salesType || "").toUpperCase();
      const c = String(clientType || "").toUpperCase();
      const rephrase = !!(opts && opts.rephrase);

      const tcf = s.includes("T") && c.includes("F");
      const fct = s.includes("F") && c.includes("T");
      const jvp = s.includes("J") && c.includes("P");
      const pvj = s.includes("P") && c.includes("J");
      const svn = s.includes("S") && c.includes("N");
      const sameMid = s.length === 4 && c.length === 4 && s.substring(1, 3) === c.substring(1, 3);

      if (tcf) {
        return pick(
          rephrase
            ? [
                "我这边更看细节、讲实在，但今天看您戴上它的样子，我真心觉得就是写了您的名字。",
                "我习惯把参数讲清，可刚才看您上手的反应，我反而更想少谈数据、多信您的直觉。",
                "我销售风格更偏理性，可您一戴上我就懂了：动人与不动人，不只看参数。",
              ]
            : [
                "我的销售风格其实更看细节，但今天看您戴上这款作品时的那种状态，真的让我挺感动的，感觉它就是写了您的名字。",
                "我偏讲实据，但看您上手的那个瞬间，我觉得这款跟您的气质是碰在一起的。",
              ],
        );
      }
      if (fct) {
        return pick(
          rephrase
            ? [
                "看得出来您很注意作品品质、非常有眼光。我把实戴和保养都给您写进一句：全国门店都能做清洗，您洗澡或进桑拿前先取下。",
                "我懂您看参数和品控的严谨，所以我把能落地的点说清楚：全国 Tiffany 店都能做护理，别戴着洗澡更省心。",
              ]
            : [
                "看得出来您很注意作品品质，所以我特意为您准备了这份保养细节：全国 Tiffany 店铺都能做超声波清洗，洗澡或高温时记得取下它就好。",
                "您要的是可验证的品质和细节，我就按能落地的来：全国门店能护理，平常洗澡、进桑拿前记得先取下。",
              ],
        );
      }
      if (jvp) {
        return pick(
          rephrase
            ? [
                "我这人节奏不拖泥带水，可今天陪您挑的过程反而挺舒服，像慢慢遇见真正对眼的那件。",
                "我习惯干脆收官，可今天我愿意陪慢点，毕竟珠宝这件事值得您认真一点。",
              ]
            : [
                "我平时做事节奏比较快，但今天陪您挑选的过程反而让我很享受，这种慢慢遇到“真爱”的感觉才是买珠宝最对的状态。",
                "我惯常推进得快，可今天陪着您，我更珍惜那种不催、不赶、慢慢对味的过程。",
              ],
        );
      }
      if (pvj) {
        return pick(
          rephrase
            ? [
                "我性格偏随性，但非常欣赏您这种把细节也抠得很稳的态度，这款的经典工艺，经得起您的时间检验。",
                "我讲话不喜欢端着，可您要的结构感我都懂，这款工艺扎实，和您的节奏其实挺配的。",
              ]
            : [
                "我性格比较随性，但非常欣赏您这种对细节的严谨。这款作品的经典工艺经得起时间考验，跟您的气质非常契合。",
                "我这边表达偏放松，可您要确定感我很尊重；这款的做工和结构，和您的审美应该很合拍。",
              ],
        );
      }
      if (svn) {
        return pick(
          rephrase
            ? [
                "我更习惯把尺寸、金重这些讲明，可刚才听您谈灵感，我反而觉得您把它讲活了。",
                "我平常常讲可验证的点，可您一开口是画面和象征，我跟着您的叙述走反而更对味。",
              ]
            : [
                "我平时更习惯讲具体的参数，但刚才听您聊起这款设计带给您的灵感，我觉得您比我更懂这件作品的灵魂。",
                "我默认先把细节说透，可您一讲到寓意和感觉，我反而想把话筒交给您。",
              ],
        );
      }
      if (sameMid) {
        return pick(
          rephrase
            ? [
                "这种审美和节奏都对的客人不常见，我推荐这款时也挺有成就感，它确实把您的气场托得很稳。",
                "能遇到这么同频的客人我也轻松，选品这件事像商量着来，这款跟您的气质是贴得住的。",
              ]
            : [
                "很难得遇到审美和节奏都这么契合的客人，为您推荐这款作品我也非常有成就感，它确实非常适合您的气场。",
                "能遇到这么对味的客人不常见，今天这件我和您都点头，我这边也更安心。",
              ],
        );
      }
      // 默认兜底：多组轮换，去「模板腔」
      return pick([
        "今天这件选得妙，经典和您个人风格在一起，不抢戏，很耐看。",
        "我回头看今天这组搭配，越琢磨越对：Tiffany 的干净线条和您的气质是互相成全的。",
        "不夸张地说，它今天一上手就很顺，您要还想微调佩戴角度，我下次帮您一起对。",
        "我这边不追话术，就一句：它今天上镜也上手，和您很配。",
        "您把经典款带出了不一样的风格。",
      ]);
    },

    /**
     * 尾句：偏微信、偏真人，避免「很高兴为您服务 / 联系」等客服腔
     * @param {{ rephrase?: boolean }} [opts] rephrase 为 true 时一定换一版（内部仍随机，便于「换个说法」）
     */
    getClosing: function (opts) {
      const rephrase = !!(opts && opts.rephrase);
      const closings = rephrase
        ? [
            "以后有任何需要，或者想回来清洗护理了，随时微信喊我。",
            "有什么佩戴上的问题，尽管找我。",
            "您之后有其他款式想试戴或者护理，微信联系我就行。",
            "我这边不消失，想确认尺寸、想来看清洗档期，发我。",
            "您要我再帮您对比叠戴、配场合，也直接丢我微信。",
          ]
        : [
            "以后有任何需要，或者想回来清洗护理了，随时微信喊我。",
            "有什么佩戴上的问题，尽管找我。",
            "您之后有其他款式想试戴或者护理，微信联系我就行。",
            "后面想确认手寸、想来店里做基础护理，微信喊我。",
            "您要我把实戴和保养用两三句写给您，我回头直接发。",
          ];
      return pick(closings);
    },
  };

  window.followUpLogic = followUpLogic;
})();
