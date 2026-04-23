// 珠宝店MBTI快速判断系统 - 6题版
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
            text: "径直走向目标展柜（如钻石区/彩宝区），目的明确", 
            scores: { E: 0, I: 2, S: 1, N: 0, T: 1, F: 0, J: 2, P: 0 }
          },
          { 
            label: "B", 
            text: "缓步浏览，目光在多个展柜间游走，偶尔驻足", 
            scores: { E: 1, I: 1, S: 0, N: 2, T: 0, F: 1, J: 0, P: 2 }
          },
          { 
            label: "C", 
            text: "先环顾店铺整体环境、灯光、陈列布局，再走近展柜", 
            scores: { E: 0, I: 2, S: 0, N: 2, T: 0, F: 0, J: 1, P: 1 }
          },
          { 
            label: "D", 
            text: "站在门口附近，等待顾问主动上前引导", 
            scores: { E: 0, I: 2, S: 1, N: 0, T: 0, F: 1, J: 0, P: 2 }
          }
        ]
      },
      {
        id: 2,
        text: "对顾问问候的反应",
        description: "您问候后，客人：",
        options: [
          { 
            label: "A", 
            text: "直接回答具体需求，如'我想看婚戒/某品牌系列'", 
            scores: { E: 2, I: 0, S: 2, N: 0, T: 1, F: 0, J: 2, P: 0 }
          },
          { 
            label: "B", 
            text: "微笑说'我先看看'，但眼神仍在寻找交流机会", 
            scores: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
          },
          { 
            label: "C", 
            text: "简短回应'看看'，随即低头专注看展柜，不延伸话题", 
            scores: { E: 0, I: 2, S: 2, N: 0, T: 1, F: 0, J: 1, P: 1 }
          },
          { 
            label: "D", 
            text: "反问'你们有什么推荐？最近有什么新款？'", 
            scores: { E: 2, I: 0, S: 0, N: 2, T: 0, F: 1, J: 0, P: 2 }
          }
        ]
      },
      {
        id: 3,
        text: "试戴时的互动方式",
        description: "当顾问取出珠宝请客人试戴时：",
        options: [
          { 
            label: "A", 
            text: "立刻试戴，边戴边问'这个适合我吗？你觉得呢？'", 
            scores: { E: 2, I: 0, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
          },
          { 
            label: "B", 
            text: "先仔细观察工艺、镶嵌、背面细节，再决定是否试戴", 
            scores: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
          },
          { 
            label: "C", 
            text: "试戴后立刻掏出手机自拍，或拍照发给朋友", 
            scores: { E: 2, I: 0, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
          },
          { 
            label: "D", 
            text: "试戴后站在镜前静止观察许久，表情内敛，很少主动评价", 
            scores: { E: 0, I: 2, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 }
          }
        ]
      },
      {
        id: 4,
        text: "对珠宝细节的关注点",
        description: "客人在看货时，反复询问或查看的是：",
        options: [
          { 
            label: "A", 
            text: "价格、折扣、保养政策、售后条款", 
            scores: { E: 0, I: 1, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
          },
          { 
            label: "B", 
            text: "设计灵感、宝石产地故事、品牌历史、佩戴场合建议", 
            scores: { E: 1, I: 1, S: 0, N: 2, T: 0, F: 2, J: 0, P: 2 }
          },
          { 
            label: "C", 
            text: "4C参数、证书编号、金属纯度、工艺技术细节", 
            scores: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
          },
          { 
            label: "D", 
            text: "是否限量、是否有人佩戴过、是否容易撞款", 
            scores: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 1, P: 1 }
          }
        ]
      },
      {
        id: 5,
        text: "做决策时的状态",
        description: "当客人在两件珠宝之间犹豫时：",
        options: [
          { 
            label: "A", 
            text: "主动征求您的意见：'如果是你，会选哪个？'", 
            scores: { E: 2, I: 0, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
          },
          { 
            label: "B", 
            text: "拿出手机列对比清单，或反复翻看参数卡片", 
            scores: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
          },
          { 
            label: "C", 
            text: "闭眼想象佩戴场景，或问'哪条更能提升气场？'", 
            scores: { E: 0, I: 1, S: 0, N: 2, T: 0, F: 2, J: 0, P: 2 }
          },
          { 
            label: "D", 
            text: "说'我再想想'，退后一步沉默观察，不急于决定", 
            scores: { E: 0, I: 2, S: 1, N: 1, T: 1, F: 0, J: 0, P: 2 }
          }
        ]
      },
      {
        id: 6,
        text: "离店前的行为信号",
        description: "接待结束时，客人：",
        options: [
          { 
            label: "A", 
            text: "主动加微信/要名片，说'回去考虑，有活动通知我'", 
            scores: { E: 2, I: 0, S: 1, N: 1, T: 1, F: 1, J: 1, P: 1 }
          },
          { 
            label: "B", 
            text: "仔细收好证书、包装，确认保修卡后平静离开", 
            scores: { E: 0, I: 2, S: 2, N: 0, T: 2, F: 0, J: 2, P: 0 }
          },
          { 
            label: "C", 
            text: "临出门前又折返再看一眼某件珠宝，流露不舍", 
            scores: { E: 1, I: 1, S: 1, N: 1, T: 0, F: 2, J: 0, P: 2 }
          },
          { 
            label: "D", 
            text: "直接问'现在买有什么赠品？能否今天预留？'", 
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
          approach: "直接展示核心款式，提供清晰的价格与参数对比，强调品牌信誉和售后保障。避免过多故事铺垫。"
        },
        "ESFJ": {
          title: "社交型购买者",
          traits: ["重视他人意见", "喜欢被认可", "关注社交场合适配度"],
          approach: "多给予真诚赞美，邀请她试戴并拍照分享，强调'这款很适合您的气质'，可提及明星/名媛同款。"
        },
        "ISTJ": {
          title: "理性研究者",
          traits: ["细节控", "谨慎决策", "重视证书与参数"],
          approach: "提供完整的GIA证书、详细参数卡片，给她独立思考空间，不要急于逼单，用事实和数据说话。"
        },
        "ISFJ": {
          title: "温柔守护者",
          traits: ["内敛含蓄", "重视情感意义", "注重传统与保值"],
          approach: "讲述珠宝的情感寓意（如传承、纪念意义），营造温馨私密的氛围，耐心陪伴，不施加压力。"
        },
        "ENTJ": {
          title: "掌控型领袖",
          traits: ["果断自信", "追求独特", "厌恶低效"],
          approach: "快速展示高定/限量款，突出稀缺性和独特性，提供VIP专属方案，尊重她的决策主导权。"
        },
        "ENFJ": {
          title: "魅力影响者",
          traits: ["热情外向", "重视关系", "喜欢被关注"],
          approach: "营造轻松愉快的交流氛围，多聊生活方式与穿搭场景，让她感受到被重视和特别的待遇。"
        },
        "INTJ": {
          title: "战略分析师",
          traits: ["独立思考", "追求完美", "重视品质与内涵"],
          approach: "展示设计感强、工艺精湛的款式，分享设计理念和宝石知识，给她充分的信息和决策时间。"
        },
        "INFJ": {
          title: "理想主义者",
          traits: ["洞察力强", "追求意义", "注重精神共鸣"],
          approach: "讲述珠宝背后的故事与灵魂，营造艺术与哲学的氛围，让她感受到这件珠宝与她的精神契合。"
        },
        "ESTP": {
          title: "即兴体验者",
          traits: ["活在当下", "喜欢刺激", "冲动消费倾向"],
          approach: "制造紧迫感（限量/活动倒计时），鼓励即时试戴体验，强调'现在拥有'的快乐，可适度促单。"
        },
        "ESFP": {
          title: "快乐享受者",
          traits: ["外向活泼", "追求美感", "喜欢分享"],
          approach: "让她尽情试戴、拍照，赞美她的品味，推荐设计感强、适合社交场合的亮眼款式，氛围要轻松有趣。"
        },
        "ISTP": {
          title: "冷静观察者",
          traits: ["低调务实", "注重品质", "不喜被推销"],
          approach: "保持适度距离，提供专业技术信息，让她自主探索，当她提问时再精准回答，不要过度热情。"
        },
        "ISFP": {
          title: "艺术感知者",
          traits: ["敏感细腻", "审美独特", "重视个人感受"],
          approach: "展示工艺精美、设计独特的款式，让她在安静环境中慢慢感受，用'您觉得呢'代替强势推荐。"
        },
        "ENTP": {
          title: "创意挑战者",
          traits: ["好奇心强", "喜欢辩论", "追求新鲜感"],
          approach: "展示创新设计或跨界联名款，与她探讨珠宝趋势和设计话题，保持灵活，不要给她固定框架。"
        },
        "ENFP": {
          title: "热情探索者",
          traits: ["充满热情", "想法多变", "重视可能性"],
          approach: "带她探索不同风格的珠宝，分享各种搭配可能性，保持轻松有趣的互动，给她足够的选择空间。"
        },
        "INTP": {
          title: "逻辑建构者",
          traits: ["理性分析", "追求知识", "独立判断"],
          approach: "深入讲解宝石学知识、工艺原理，提供详实数据，尊重她的分析过程，不要急于打断或推销。"
        },
        "INFP": {
          title: "诗意梦想家",
          traits: ["内心丰富", "追求独特", "重视价值观契合"],
          approach: "讲述珠宝的诗意故事与独特设计理念，让她感受到这件珠宝懂她，营造安静、不被打扰的欣赏空间。"
        }
      };
  
      return descriptions[mbtiType] || {
        title: "综合型客人",
        traits: ["特征混合", "需要灵活应对"],
        approach: "结合多种策略，观察她当下的状态调整节奏。"
      };
    },
  
    // 渲染题目（可用于前端展示）
    renderQuiz(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
  
      let html = '<div class="mbti-quiz">';
      html += '<h2>珠宝店客人MBTI快速判断</h2>';
      html += '<p class="subtitle">请根据您观察到的客人行为，选择最符合的选项</p>';
  
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
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = mbtiQuiz;
  }
  
  // ========== 使用示例 ==========
  
  // 示例1：纯代码调用（顾问在后台快速判断）
  // const guestAnswers = ["A", "C", "B", "C", "B", "B"]; // ISTJ
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