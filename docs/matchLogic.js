// matchLogic.js - 奢侈品专家实战进阶版
// 供 index.html 以 <script src="matchLogic.js"> 引用，使用 window.matchLogic

(function () {
  "use strict";

  /** 客人性格簇（NF / NT / SJ / SP）在顶级导购眼中的画像（不依赖销售信息） */
  const clientPortraits = {
    NF: "这位客人是「意义与共鸣驱动型」：他/她更在意作品背后的故事、自我投射与情感仪式。试戴时多留白，用品牌叙事与画面感帮对方找到「这就是我」的那一件。",
    NT: "这位客人是「结构与理性驱动型」：他/她需要清晰逻辑、可对比的参数与可验证的专业度。用克制、有分寸的专业表达建立信任，避免空洞的夸赞。",
    SJ: "这位客人是「安全感与稳定驱动型」：他/她重视口碑、历史传承、售后与可预期的体验。用稳妥、可兑现的承诺与「得体不出错」的推荐，让对方安心落袋。",
    SP: "这位客人是「当下体验与美感驱动型」：他/她更在意上手的真实感受、即时的美与场域氛围。用轻松陪伴与「现在就好看」的反馈，把体验做得像一场小型鉴赏。",
  };

  // matchLogic.js - 奢侈品导购实战心理图谱
  const matchLogic = {
    clientPortraits,
    // 1. 导购性格词典 (定义销售的底色)
    salesProfiles: {
      'ESTJ': '务实高效、结果导向的“专业统筹者”',
      'ESFJ': '热情周到、注重和谐的“金牌关怀者”',
      'INTJ': '冷静深邃、逻辑严密的“战略智囊”',
      'ENFP': '灵感涌现、极具感染力的“创意大使”',
      'ISTJ': '严谨可靠、注重传承的“品质守护者”',
      'ISFJ': '细腻温婉、极具耐心和服务的“优雅幕僚”',
      'ENTJ': '极具气场、引领决策的“风格领袖”',
      'INFJ': '洞察入微、富有同理心的“灵魂导师”',
      'ISTP': '冷静观察、看重实效的“工艺匠人”',
      'ISFP': '温和感性、审美敏锐的“艺术精灵”',
      'ESTP': '反应灵敏、擅长破冰的“现场大师”',
      'ESFP': '魅力四射、制造快乐的“派对焦点”',
      'ENTP': '思维活跃、不拘一格的“灵感辩手”',
      'INTP': '独立思考、追求极致的“逻辑学者”',
      'ENFJ': '充满热情、极具感召力的“情感导师”',
      'INFP': '内心丰富、追求意义的“唯美诗人”'
    },
  
    // 2. 维度冲突逻辑 (用于生成矛盾点与止痛药)
    conflicts: {
      'E_I': {
        scenario: "你习惯通过不断交流来推进氛围，而客人更倾向于安静观察。",
        solution: "你要学会‘留白’。尝试把话筒交给客人，或者在提供专业服务后有意识地后退一步，给他呼吸的空间。"
      },
      'S_N': {
        scenario: "你关注具体的参数和现货情况，而客人正在脑海中勾勒珠宝背后的情感蓝图。",
        solution: "你要学会‘造梦’。少说克拉数，多聊聊这款设计如何象征了他的人生阶段或独特的审美见解。"
      },
      'T_F': {
        scenario: "你试图通过理性和逻辑（如保值率）来说服，但客人正被某种莫名的‘心动感’驱动。",
        solution: "你要学会‘共情’。放下你的专业报表，用真诚的赞美去肯定他的品味，让他感受到被偏爱的温度。"
      },
      'J_P': {
        scenario: "你希望尽快确定款式进入包装流程，但客人在对比中享受那种‘无限可能’。",
        solution: "你要学会‘陪跑’。不要流露出催促的信号，告诉他‘挑选 Tiffany 是值得被慎重对待的仪式’。"
      },
      // 特殊案例：针对你提到的 ESTJ vs ESFJ 这种极其接近但决策维度相反的情况
      'T_F_CLOSE': {
        scenario: "你们都对细节（S）和秩序（J）有共识，但你在讲‘理’，他在讲‘情’。",
        solution: "你要把‘理’翻译成‘情’。不要只说这款切割有多好（T），要说这种光芒最能衬托他的幸福感（F）。"
      }
    },

    /**
     * 生成「实操建议」结构化结果，供 index.html 渲染到「实操建议」模块
     */
    getPracticeAdvice: function (salesType, clientType) {
      const s = String(salesType || "").trim().toUpperCase();
      const c = String(clientType || "").trim().toUpperCase();
      const isValid = (t) => /^[EI][SN][TF][JP]$/.test(t);
      if (!isValid(s) || !isValid(c)) {
        return { ok: false, summary: "请先选择有效的 4 字母 MBTI（如 ESTJ）。", items: [] };
      }

      const keys = ["E_I", "S_N", "T_F", "J_P"];
      const mismatchKeys = [];
      for (let i = 0; i < 4; i++) {
        if (s[i] !== c[i]) mismatchKeys.push(keys[i]);
      }

      if (mismatchKeys.length === 0) {
        return {
          ok: true,
          summary: "你们的沟通频率高度一致：保持自然节奏，用你最擅长的方式推进即可。",
          items: [],
        };
      }

      // 特殊 close case：仅 T/F 不同且 S、J 相同
      if (mismatchKeys.length === 1 && mismatchKeys[0] === "T_F" && s[1] === c[1] && s[3] === c[3]) {
        const d = this.conflicts.T_F_CLOSE;
        return {
          ok: true,
          summary: "你们很接近：把表达从“结论”轻轻翻译成“感受”，推进会更顺。",
          items: [{ title: "决策维度微差", key: "T_F_CLOSE", scenario: d.scenario, solution: d.solution }],
        };
      }

      const titleMap = { E_I: "能量节奏", S_N: "信息偏好", T_F: "决策语言", J_P: "推进节奏" };
      const items = mismatchKeys
        .map((k) => {
          const d = this.conflicts[k];
          if (!d) return null;
          return { title: titleMap[k] || k, key: k, scenario: d.scenario, solution: d.solution };
        })
        .filter(Boolean);

      return { ok: true, summary: "根据你与客人的差异维度，建议按下列方式调频。", items };
    },
  };

  window.matchLogic = matchLogic;
})();
