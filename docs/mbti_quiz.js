// 珠宝店MBTI快速判断系统 - 6题版（首次购买/品牌新客优化）
// 适用于客户顾问在接待过程中通过观察快速判断客人类型

const mbtiQuiz = {
  // 题目配置
  questions: [
    {
      id: 1,
      text: "进店后的空间行为",
      description: "客人进入店铺后，您观察到她/他：",
      options: [
        { 
          label: "A", 
          text: "径直走向某一类展柜（如钻石区/黄金区），步伐果断，目标感强", 
          scores: { E: 0, I: 2, S: 1, N: 0, T: 1, F: 0, J: 2, P: 0 }
        },
        { 
          label: "B", 
          text: "缓步游走于多个展柜之间，目光跳跃，对多件作品都流露出兴趣", 
          scores: { E: 1, I: 0, S: 0, N: 2, T: 0, F: 1, J: 0, P: 2 }
        },
        { 
          label: "C", 
          text: "先驻足感受店铺整体氛围、灯光与陈列，再走近具体展柜细看", 
          scores: { E: 0, I: 2, S: 0, N: 1, T: 0, F: 1, J: 1, P: 1 }
        },
        { 
          label: "D", 
          text: "站在入口附近环视，等待顾问主动上前引导，不急于独自探索", 
          scores: { E: 0, I: 2, S: 1, N: 0, T: 0, F: 1, J: 0, P: 2 }
        }
      ]
    },
    {
      id: 2,
      text: "对顾问问候的反应",
      description: "您上前问候后，客人：",
      options: [
        { 
          label: "A", 
          text: "直接陈述需求：'我想看戒指/项链/某某系列'，或出示图片询问类似款", 
          scores: { E: 2, I: 0, S: 2, N: 0, T: 1, F: 0, J: 2, P: 0 }
        },
        { 
          label: "B", 
          text: "微笑回应'我先看看'，但眼神保持接触，姿态开放，预留对话空间", 
          scores: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
        },
        { 
          label: "C", 
          text: "简短点头或低声回应，随即低头专注看货，不主动开启话题", 
          scores: { E: 0, I: 2, S: 2, N: 0, T: 1, F: 0, J: 1, P: 1 }
        },
        { 
          label: "D", 
          text: "主动反问：'你们有什么推荐？最近到了什么新款？'", 
          scores: { E: 2, I: 0, S: 0, N: 2, T: 0, F: 1, J: 0, P: 2 }
        }
      ]
    },
    {
      id: 3,
      text: "试戴时的互动方式",
      description: "当顾问取出珠宝邀请试戴时，客人：",
      options: [
        { 
          label: "A", 
          text: "立刻伸手试戴，边戴边寻求反馈：'这个适合我吗？你觉得呢？'", 
          scores: { E: 2, I: 0, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
        },
        { 
          label: "B", 
          text: "先翻转观察作品背面、镶嵌工艺与细节处理，再决定是否试戴", 
          scores: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
        },
        { 
          label: "C", 
          text: "试戴后询问一同前来的伙伴意见，或拍照发给信任的人参考", 
          scores: { E: 2, I: 0, S: 1, N: 0, T: 0, F: 2, J: 0, P: 2 }
        },
        { 
          label: "D", 
          text: "安静试戴，在镜前停留较久，表情内敛，很少主动评价或发问", 
          scores: { E: 0, I: 2, S: 1, N: 0, T: 1, F: 1, J: 1, P: 1 }
        }
      ]
    },
    {
      id: 4,
      text: "对珠宝细节的关注点",
      description: "看货过程中，客人反复询问或仔细查看的是：",
      options: [
        { 
          label: "A", 
          text: "价格区间、活动折扣、保修政策、售后条款、日常佩戴是否易褪色变色", 
          scores: { E: 0, I: 1, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
        },
        { 
          label: "B", 
          text: "搭配建议、佩戴场合、日常保养方式、是否好打理、上班戴是否合适", 
          scores: { E: 1, I: 0, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
        },
        { 
          label: "C", 
          text: "4C参数、证书编号、金属纯度与克重、宝石具体尺寸、工艺技术细节", 
          scores: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
        },
        { 
          label: "D", 
          text: "是否经典耐看、别人会不会觉得好看、辨识度如何、社交场合是否撑得住场面", 
          scores: { E: 1, I: 0, S: 0, N: 2, T: 0, F: 2, J: 0, P: 2 }
        }
      ]
    },
    {
      id: 5,
      text: "做决策时的状态",
      description: "当客人在两件作品之间犹豫时，您观察到：",
      options: [
        { 
          label: "A", 
          text: "主动征求您的意见：'如果是你，会选哪个？'或'哪条更衬我？'", 
          scores: { E: 2, I: 0, S: 1, N: 0, T: 0, F: 2, J: 0, P: 2 }
        },
        { 
          label: "B", 
          text: "反复对比两件的外观差异，询问'哪件更百搭/更实用/更适合日常？'", 
          scores: { E: 0, I: 1, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
        },
        { 
          label: "C", 
          text: "反复试戴两件作品，在镜前搭配不同角度，想象具体场合的佩戴效果", 
          scores: { E: 0, I: 1, S: 0, N: 2, T: 0, F: 2, J: 0, P: 2 }
        },
        { 
          label: "D", 
          text: "退后一步沉默观察，说'我再想想'，不急于当下做出决定", 
          scores: { E: 0, I: 2, S: 1, N: 0, T: 1, F: 0, J: 0, P: 2 }
        }
      ]
    },
    {
      id: 6,
      text: "离店前的行为信号",
      description: "接待接近尾声时，无论是否完成购买，您观察到客人：",
      options: [
        { 
          label: "A", 
          text: "主动与顾问交换联系方式，说'回去考虑下，有活动通知我'；或完成购买后询问'后续保养怎么联系您？'", 
          scores: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 }
        },
        { 
          label: "B", 
          text: "仔细核对证书、包装与小票信息，确认无误后平静道别；或未购买时仍礼貌整理试戴作品，对顾问服务表达感谢后离开", 
          scores: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
        },
        { 
          label: "C", 
          text: "临出门前折返再看一眼某件作品，流露不舍神情；或购买后仍频频回望其他展柜，询问'下次新品到了能通知我吗？'", 
          scores: { E: 0, I: 1, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
        },
        { 
          label: "D", 
          text: "干脆利落地道别离开，步伐从容不拖沓；或当场果断询问'现在有什么会员权益？帮我包起来'", 
          scores: { E: 2, I: 0, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
        }
      ]
    }
  ],

  // 计算MBTI类型
  calculateMBTI(answers) {
    // answers 格式: ["A", "B", "C", "D", "A", "B"] - 每道题的选项标签
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    answers.forEach((answerLabel, index) => {
      const question = this.questions[index];
      const selectedOption = question.options.find(opt => opt.label === answerLabel);

      if (selectedOption) {
        Object.entries(selectedOption.scores).forEach(([dimension, score]) => {
          scores[dimension] += score;
        });
      }
    });

    // 计算各维度倾向
    const result = {
      EI: scores.E >= scores.I ? "E" : "I",
      EI_score: scores.E >= scores.I ? scores.E : scores.I,
      EI_diff: Math.abs(scores.E - scores.I),

      SN: scores.S >= scores.N ? "S" : "N",
      SN_score: scores.S >= scores.N ? scores.S : scores.N,
      SN_diff: Math.abs(scores.S - scores.N),

      TF: scores.T >= scores.F ? "T" : "F",
      TF_score: scores.T >= scores.F ? scores.T : scores.F,
      TF_diff: Math.abs(scores.T - scores.F),

      JP: scores.J >= scores.P ? "J" : "P",
      JP_score: scores.J >= scores.P ? scores.J : scores.P,
      JP_diff: Math.abs(scores.J - scores.P),
    };

    const mbtiType = result.EI + result.SN + result.TF + result.JP;

    // 判断置信度
    const totalDiff = result.EI_diff + result.SN_diff + result.TF_diff + result.JP_diff;
    const confidence = totalDiff >= 8 ? "高" : totalDiff >= 5 ? "中" : "低";

    // 找出最突出的维度（差异最大的）
    const diffs = [
      { dim: "EI", diff: result.EI_diff, type: result.EI },
      { dim: "SN", diff: result.SN_diff, type: result.SN },
      { dim: "TF", diff: result.TF_diff, type: result.TF },
      { dim: "JP", diff: result.JP_diff, type: result.JP }
    ];
    diffs.sort((a, b) => b.diff - a.diff);
    const dominantTrait = diffs[0];

    return {
      type: mbtiType,
      scores: scores,
      confidence: confidence,
      dominantTrait: dominantTrait,
      details: result,
      rawDiffs: diffs
    };
  },

  // 获取类型描述（珠宝销售场景）
  getTypeDescription(mbtiType) {
    const descriptions = {
      "ESTJ": {
        title: "果断决策者",
        traits: ["目标明确", "注重效率", "重视性价比与售后"],
        approach: "直接展示核心款式，提供清晰的价格与参数对比，强调品牌信誉和售后保障。避免过多故事铺垫，尊重她的时间。"
      },
      "ESFJ": {
        title: "社交型购买者",
        traits: ["重视他人意见", "喜欢被认可", "关注社交场合适配度"],
        approach: "多给予真诚赞美，邀请她试戴并分享感受，强调'这款很适合您的气质'。若有同伴，适度引导同伴给予正面反馈。"
      },
      "ISTJ": {
        title: "理性研究者",
        traits: ["细节控", "谨慎决策", "重视证书与参数"],
        approach: "提供完整的证书、详细参数卡片，给她独立思考空间，不要急于逼单，用事实和数据建立信任。"
      },
      "ISFJ": {
        title: "温柔守护者",
        traits: ["内敛含蓄", "重视情感意义", "注重实用与保值"],
        approach: "讲述珠宝的情感寓意与日常实用性，营造温馨私密的氛围，耐心陪伴，不施加压力，让她感到安心。"
      },
      "ENTJ": {
        title: "掌控型领袖",
        traits: ["果断自信", "追求独特", "厌恶低效"],
        approach: "快速展示高辨识度款式，突出稀缺性和独特性，提供VIP专属方案，尊重她的决策主导权，不要过度铺垫。"
      },
      "ENFJ": {
        title: "魅力影响者",
        traits: ["热情外向", "重视关系", "喜欢被关注"],
        approach: "营造轻松愉快的交流氛围，多聊生活方式与穿搭场景，让她感受到被重视和特别的待遇，建立情感连接。"
      },
      "INTJ": {
        title: "战略分析师",
        traits: ["独立思考", "追求完美", "重视品质与内涵"],
        approach: "展示设计感强、工艺精湛的款式，分享设计理念和宝石知识，给她充分的信息和决策时间，不要打扰她的思考。"
      },
      "INFJ": {
        title: "理想主义者",
        traits: ["洞察力强", "追求意义", "注重精神共鸣"],
        approach: "讲述珠宝背后的故事与独特设计理念，营造艺术与情感的氛围，让她感受到这件珠宝与她的精神契合。"
      },
      "ESTP": {
        title: "即兴体验者",
        traits: ["活在当下", "喜欢刺激", "冲动消费倾向"],
        approach: "制造紧迫感（限量/活动倒计时），鼓励即时试戴体验，强调'现在拥有'的快乐，可适度促单，保持节奏明快。"
      },
      "ESFP": {
        title: "快乐享受者",
        traits: ["外向活泼", "追求美感", "喜欢分享"],
        approach: "让她尽情试戴、拍照，赞美她的品味，推荐设计感强、适合社交场合的亮眼款式，氛围要轻松有趣。"
      },
      "ISTP": {
        title: "冷静观察者",
        traits: ["低调务实", "注重品质", "不喜被推销"],
        approach: "保持适度距离，提供专业技术信息，让她自主探索，当她提问时再精准回答，不要过度热情或强行推荐。"
      },
      "ISFP": {
        title: "艺术感知者",
        traits: ["敏感细腻", "审美独特", "重视个人感受"],
        approach: "展示工艺精美、设计独特的款式，让她在安静环境中慢慢感受，用'您觉得呢'代替强势推荐，尊重她的审美直觉。"
      },
      "ENTP": {
        title: "创意挑战者",
        traits: ["好奇心强", "喜欢探讨", "追求新鲜感"],
        approach: "展示创新设计或跨界联名款，与她探讨珠宝趋势和设计话题，保持灵活开放，不要给她固定框架。"
      },
      "ENFP": {
        title: "热情探索者",
        traits: ["充满热情", "想法多变", "重视可能性"],
        approach: "带她探索不同风格的珠宝，分享各种搭配可能性，保持轻松有趣的互动，给她足够的选择空间和想象空间。"
      },
      "INTP": {
        title: "逻辑建构者",
        traits: ["理性分析", "追求知识", "独立判断"],
        approach: "深入讲解宝石学知识、工艺原理，提供详实数据，尊重她的分析过程，不要急于打断或推销，用专业建立信任。"
      },
      "INFP": {
        title: "诗意梦想家",
        traits: ["内心丰富", "追求独特", "重视价值观契合"],
        approach: "讲述珠宝的诗意故事与独特设计理念，让她感受到这件珠宝懂她，营造安静、不被打扰的欣赏空间，不催促决策。"
      }
    };

    return descriptions[mbtiType] || {
      title: "综合型客人",
      traits: ["特征混合", "需要灵活应对"],
      approach: "结合多种策略，观察她当下的状态调整节奏，优先关注最突出的维度特征。"
    };
  },

  // 渲染题目（可用于前端展示）
  renderQuiz(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '<div class="mbti-quiz">';
    html += '<h2>珠宝店客人MBTI快速判断</h2>';
    html += '<p class="subtitle">请根据您观察到的客人行为，选择最符合的选项（适用于首次购买/品牌新客）</p>';

    this.questions.forEach((q, idx) => {
      html += `<div class="question-card" data-qid="${q.id}">`;
      html += `<div class="question-num">第 ${idx + 1} 题</div>`;
      html += `<div class="question-title">${q.text}</div>`;
      html += `<div class="question-desc">${q.description}</div>`;
      html += '<div class="options">';

      q.options.forEach(opt => {
        html += `<label class="option">`;
        html += `<input type="radio" name="q${q.id}" value="${opt.label}" data-scores='${JSON.stringify(opt.scores)}'>`;
        html += `<span class="opt-label">${opt.label}.</span>`;
        html += `<span class="opt-text">${opt.text}</span>`;
        html += `</label>`;
      });

      html += '</div></div>';
    });

    html += `<button class="submit-btn" onclick="mbtiQuiz.submitQuiz()">生成MBTI报告</button>`;
    html += '<div id="result-area"></div>';
    html += '</div>';

    container.innerHTML = html;
  },

  // 提交并计算结果
  submitQuiz() {
    const answers = [];

    for (let i = 1; i <= 6; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (!selected) {
        alert(`请完成第 ${i} 题`);
        return;
      }
      answers.push(selected.value);
    }

    const result = this.calculateMBTI(answers);
    const desc = this.getTypeDescription(result.type);

    const resultArea = document.getElementById('result-area');
    resultArea.innerHTML = `
      <div class="result-card">
        <div class="result-type">${result.type}</div>
        <div class="result-confidence">判断置信度：${result.confidence}</div>
        <div class="result-title">${desc.title}</div>
        <div class="result-traits">
          <strong>核心特征：</strong>${desc.traits.join(' · ')}
        </div>
        <div class="result-approach">
          <strong>推荐接待策略：</strong>${desc.approach}
        </div>
        <div class="result-detail">
          <details>
            <summary>查看详细分数</summary>
            <div class="score-grid">
              <div>E: ${result.scores.E} vs I: ${result.scores.I} → ${result.details.EI} (差值${result.details.EI_diff})</div>
              <div>S: ${result.scores.S} vs N: ${result.scores.N} → ${result.details.SN} (差值${result.details.SN_diff})</div>
              <div>T: ${result.scores.T} vs F: ${result.scores.F} → ${result.details.TF} (差值${result.details.TF_diff})</div>
              <div>J: ${result.scores.J} vs P: ${result.scores.P} → ${result.details.JP} (差值${result.details.JP_diff})</div>
            </div>
            <div class="dominant-trait">
              最突出维度：${result.dominantTrait.dim} (${result.dominantTrait.type})，差值 ${result.dominantTrait.diff}
            </div>
          </details>
        </div>
      </div>
    `;

    resultArea.scrollIntoView({ behavior: 'smooth' });
  }
};

// 导出模块（支持ES Module和CommonJS）
if (typeof module !== "undefined" && module.exports) {
  module.exports = mbtiQuiz;
}
if (typeof window !== "undefined" && window) {
  window.mbtiQuiz = mbtiQuiz;
}

// ========== 使用示例 ==========

// 示例1：纯代码调用（顾问在后台快速判断）
// const guestAnswers = ["A", "C", "B", "C", "B", "B"];
// const result = mbtiQuiz.calculateMBTI(guestAnswers);
// console.log("客人MBTI类型:", result.type);
// console.log("置信度:", result.confidence);
// console.log("接待策略:", mbtiQuiz.getTypeDescription(result.type));

// 示例2：前端渲染交互页面
// mbtiQuiz.renderQuiz('quiz-container');

// 示例3：批量测试（用于验证题目区分度）
function runTestCases() {
  const testCases = [
    { name: "ISTJ典型", answers: ["A", "C", "B", "C", "B", "B"] },
    { name: "ENFP典型", answers: ["D", "D", "A", "B", "A", "C"] },
    { name: "ESTJ典型", answers: ["A", "A", "B", "A", "B", "D"] },
    { name: "INFP典型", answers: ["C", "C", "D", "B", "D", "C"] },
  ];

  testCases.forEach(tc => {
    const r = mbtiQuiz.calculateMBTI(tc.answers);
    console.log(`${tc.name}: ${r.type} (置信度:${r.confidence})`);
  });
}

// runTestCases();
