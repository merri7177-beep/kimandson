// Nature Healing Homepage JS - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // Initialize lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile navigation toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        if (mobileMenu) mobileMenu.classList.add('hidden');
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Health Habit Program Logic
  setupHealthChecklist();

  // Guestbook Logic
  setupGuestbook();
});

// 1. Health Habit Checklist Program
function setupHealthChecklist() {
  const form = document.getElementById('health-form');
  const startBtn = document.getElementById('start-checklist-btn');
  const checklistSection = document.getElementById('checklist-questions');
  const resultCard = document.getElementById('checklist-result');
  const scoreBadge = document.getElementById('result-score');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const adviceList = document.getElementById('result-advice');
  const restartBtn = document.getElementById('restart-checklist-btn');

  // Interactive Checklist styling (toggling classes on selection)
  const checklistItems = document.querySelectorAll('.checklist-item');
  
  checklistItems.forEach(item => {
    const radioYes = item.querySelector('input[value="yes"]');
    const radioNo = item.querySelector('input[value="no"]');
    const btnYes = item.querySelector('.btn-yes');
    const btnNo = item.querySelector('.btn-no');

    if (btnYes && btnNo && radioYes && radioNo) {
      btnYes.addEventListener('click', () => {
        radioYes.checked = true;
        btnYes.classList.add('bg-emerald-600', 'text-white');
        btnYes.classList.remove('bg-gray-100', 'text-gray-700');
        btnNo.classList.remove('bg-rose-500', 'text-white');
        btnNo.classList.add('bg-gray-100', 'text-gray-700');
        item.classList.add('border-emerald-200', 'bg-emerald-50/10');
      });

      btnNo.addEventListener('click', () => {
        radioNo.checked = true;
        btnNo.classList.add('bg-rose-500', 'text-white');
        btnNo.classList.remove('bg-gray-100', 'text-gray-700');
        btnYes.classList.remove('bg-emerald-600', 'text-white');
        btnYes.classList.add('bg-gray-100', 'text-gray-700');
        item.classList.remove('border-emerald-200', 'bg-emerald-50/10');
      });
    }
  });

  // Start program
  if (startBtn && checklistSection) {
    startBtn.addEventListener('click', () => {
      const age = document.getElementById('user-age').value;
      const gender = document.getElementById('user-gender').value;

      if (!age || !gender) {
        alert('연령대와 성별을 먼저 선택해 주세요.');
        return;
      }

      // Smooth slide down to questions
      checklistSection.classList.remove('hidden');
      checklistSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const age = document.getElementById('user-age').value;
      const gender = document.getElementById('user-gender').value;
      
      // Calculate score
      let score = 0;
      let unanswered = false;

      for (let i = 1; i <= 10; i++) {
        const checkedRadio = form.querySelector(`input[name="q${i}"]:checked`);
        if (!checkedRadio) {
          unanswered = true;
          break;
        }
        if (checkedRadio.value === 'yes') {
          score++;
        }
      }

      if (unanswered) {
        alert('10가지 체크리스트에 모두 답변해 주세요.');
        return;
      }

      // Display Results
      showResults(score, age, gender);
    });
  }

  // Handle Restart
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      form.reset();
      // Reset custom buttons
      checklistItems.forEach(item => {
        const btnYes = item.querySelector('.btn-yes');
        const btnNo = item.querySelector('.btn-no');
        if (btnYes && btnNo) {
          btnYes.classList.remove('bg-emerald-600', 'text-white');
          btnYes.classList.add('bg-gray-100', 'text-gray-700');
          btnNo.classList.remove('bg-rose-500', 'text-white');
          btnNo.classList.add('bg-gray-100', 'text-gray-700');
        }
        item.classList.remove('border-emerald-200', 'bg-emerald-50/10');
      });

      resultCard.classList.add('hidden');
      checklistSection.classList.add('hidden');
      document.getElementById('health-form-inputs').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function showResults(score, age, gender) {
    resultCard.classList.remove('hidden');
    
    // Animate score count-up
    let currentScore = 0;
    scoreBadge.textContent = '0점';
    const interval = setInterval(() => {
      if (currentScore >= score) {
        clearInterval(interval);
        scoreBadge.textContent = `${score}점 / 10점`;
      } else {
        currentScore++;
        scoreBadge.textContent = `${currentScore}점`;
      }
    }, 80);

    // Score-based Title and Description
    let level = '';
    let desc = '';
    let levelColorClass = '';

    if (score >= 8) {
      level = '자연치유형 건강 지킴이 🌿';
      desc = '훌륭합니다! 자연과 가까운 건강한 생활 습관을 잘 유지하고 계십니다. 몸과 마음의 조화가 아주 뛰어난 상태입니다.';
      levelColorClass = 'text-emerald-700';
    } else if (score >= 5) {
      level = '조화로운 성장의 길 🌻';
      desc = '좋은 습관을 가지고 계시지만, 조금 더 보완하면 자연치유력을 극대화할 수 있습니다. 아래 조언을 참고해 보세요.';
      levelColorClass = 'text-amber-700';
    } else {
      level = '자연 치유가 필요한 쉼표 단계 🍂';
      desc = '현재 일상의 스트레스나 불균형으로 인해 몸과 마음이 지쳐있을 수 있습니다. 지금이 바로 가벼운 자연치유 습관을 시작할 때입니다.';
      levelColorClass = 'text-rose-700';
    }

    resultTitle.textContent = level;
    resultTitle.className = `text-2xl font-bold ${levelColorClass} mb-2`;
    resultDesc.textContent = desc;

    // Generate Custom Advice based on Age & Gender & Score
    generateCustomAdvice(score, age, gender);

    // Scroll to results
    setTimeout(() => {
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  function generateCustomAdvice(score, age, gender) {
    adviceList.innerHTML = '';
    const advices = [];

    // 1. Demographic basic advice
    if (age === '10s') {
      advices.push('**성장기 건강 가이드**: 야외 활동을 늘려 햇볕을 쬐고 컴퓨터/스마트폰 사용 후에는 꼭 먼 산이나 자연을 바라보며 눈의 피로를 풀어주세요.');
    } else if (age === '20s' || age === '30s') {
      advices.push('**청년기 활력 가이드**: 과도한 커피나 인스턴트 대신 아침 미지근한 물 한 잔과 가벼운 심호흡으로 체내 독소를 정화하는 습관을 들여보세요.');
    } else if (age === '40s' || age === '50s') {
      advices.push('**전환기 신진대사 가이드**: 신진대사 저하를 극복하기 위해 따뜻한 물 족욕을 통해 원활한 혈액순환을 돕고 심신의 밸런스를 맞추는 것이 좋습니다.');
    } else if (age === '60s') {
      advices.push('**웰에이징 가이드**: 피톤치드가 풍부한 숲길을 호흡하며 걸어 심신을 안정시키고 관절의 체온을 따뜻하게 유지해 주는 관리가 필요합니다.');
    }

    // 2. Walking & Light Exercise suggestions (산책 / 가벼운 운동)
    let exerciseTip = '';
    if (age === '10s') {
      exerciseTip = '**산책 및 가벼운 운동**: 햇빛 아래에서 하루 40분 이상 가볍게 달리기나 빠르게 걷기를 해보세요. 성장 호르몬 자극에 이상적입니다.';
    } else if (age === '20s' || age === '30s') {
      exerciseTip = '**산책 및 가벼운 운동**: 일주일에 3회 이상 30분 동안 등에 땀이 살짝 맺히는 속보(Brisk Walking)나 조깅, 자전거 타기 같은 유산소 운동을 강력히 추천합니다.';
    } else if (age === '40s' || age === '50s') {
      exerciseTip = '**산책 및 가벼운 운동**: 관절에 무리가 가지 않도록 쿠션감 있는 운동화를 착용하고 하루 40~50분 평지나 경사가 완만한 숲길을 산책하거나 가벼운 고정식 자전거 운동이 적합합니다.';
    } else {
      exerciseTip = '**산책 및 가벼운 운동**: 오전 시간대에 30분~40분 정도 평탄한 흙길을 부드럽게 걷는 산책을 즐겨보세요. 신체 면역력 상승에 매우 효과적입니다.';
    }
    advices.push(exerciseTip);

    // 3. Gymnastics & Stretching suggestions (체조)
    let stretchTip = '';
    if (age === '10s') {
      stretchTip = '**맞춤형 이완 체조**: 공부방에서 매일 오전/오후 기지개 켜기, 목 돌리기, 허리 굽히기 등 성장 스트레칭 체조를 5분씩 3회 실천해 몸의 긴장을 풀어주세요.';
    } else if (age === '20s' || age === '30s') {
      stretchTip = '**맞춤형 이완 체조**: 거북목과 골반 뒤틀림 예방을 위해 스마트폰/모니터 앞을 벗어나 매 1시간마다 깍지 끼고 하늘 향해 뻗기, 폼롤러 스트레칭 체조를 생활화하세요.';
    } else if (age === '40s' || age === '50s') {
      stretchTip = '**맞춤형 이완 체조**: 오십견 예방과 굳은 어깨/등 근육 완화를 위해 아침저녁으로 양팔을 넓게 돌려 가슴을 열고, 척추를 좌우로 천천히 비트는 척추 교정 체조를 10회씩 실천해 보세요.';
    } else {
      stretchTip = '**맞춤형 이완 체조**: 낙상 예방과 유연성 보존을 위해 아침 기상 시 누운 상태에서 발등 당기기, 관절 가동을 돕는 부드러운 발목/손목 돌리기 및 가벼운 요가 체조를 추천합니다.';
    }
    advices.push(stretchTip);

    // 4. Custom Health Tea suggestions (건강차)
    let teaTip = '';
    if (gender === 'female') {
      teaTip = '**몸을 깨우는 건강차**: 하복부와 손발을 따뜻하게 보호해 주고 여성 호르몬 균형에 도움을 주는 따뜻한 **쑥차**, **당귀차** 또는 이완을 돕는 **캐모마일 차**를 권해드립니다.';
    } else if (gender === 'male') {
      teaTip = '**몸을 깨우는 건강차**: 만성 피로 완화와 간 기능 강화, 노폐물 배출에 훌륭한 **민들레 차**, **헛개나무 차** 또는 기력 증진을 위한 따뜻한 **구기자 차**가 안성맞춤입니다.';
    } else {
      teaTip = '**몸을 깨우는 건강차**: 소화 기능을 돕고 비타민 C가 풍부하여 피부와 피로 완화에 만능인 은은한 **국화차**나 심신 안정 작용이 뛰어난 루이보스 차가 마음을 조절해 줍니다.';
    }
    advices.push(teaTip);

    // 5. Score-specific summary
    if (score < 5) {
      advices.push('**가장 먼저 실천할 것**: 하루에 물 3잔 더 마시기, 누워서 깊은 심호흡 5회 등 무리가 되지 않는 가장 쉬운 건강 습관부터 시작해 보세요.');
    } else if (score < 8) {
      advices.push('**추천 자연치유 요법**: 이번 주말 가까운 숲속 힐링로를 방문하여 피톤치드를 온몸으로 호흡하며, 신체 균형을 재조정해 보세요.');
    } else {
      advices.push('**지속 가능한 관리**: 훌륭한 습관입니다! 명상을 결합한 조용한 차 한 잔의 여유가 매 순간 몸과 마음의 자가 복원력을 견고하게 지켜줄 것입니다.');
    }

    // Render advice items
    advices.forEach(adv => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 bg-emerald-50/40 p-3 rounded-lg border border-emerald-100/50';
      
      // Parse simple bold markdown
      const formattedText = adv.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-800">$1</strong>');
      
      li.innerHTML = `
        <span class="text-emerald-600 mt-1 select-none font-bold">✦</span>
        <span class="text-gray-700 leading-relaxed">${formattedText}</span>
      `;
      adviceList.appendChild(li);
    });
  }
}

// 2. LocalStorage Guestbook
function setupGuestbook() {
  const form = document.getElementById('guestbook-form');
  const messageInput = document.getElementById('guest-message');
  const nameInput = document.getElementById('guest-name');
  const container = document.getElementById('guestbook-list');

  // Load and Render initially
  renderMessages();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !message) {
        alert('이름과 메시지를 입력해 주세요.');
        return;
      }

      // Add to array
      const messages = getMessagesFromStorage();
      const newMessage = {
        id: Date.now().toString(),
        name: name,
        message: message,
        date: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        likes: 0
      };

      messages.unshift(newMessage);
      saveMessagesToStorage(messages);

      // Reset Form & Re-render
      nameInput.value = '';
      messageInput.value = '';
      
      renderMessages();

      // Show temporary toast or feedback
      const alertDiv = document.createElement('div');
      alertDiv.className = 'fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
      alertDiv.textContent = '방명록이 따뜻하게 등록되었습니다. 🌿';
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 2500);
    });
  }

  function getMessagesFromStorage() {
    const raw = localStorage.getItem('healing_guestbook');
    return raw ? JSON.parse(raw) : getDummyMessages();
  }

  function saveMessagesToStorage(messages) {
    localStorage.setItem('healing_guestbook', JSON.stringify(messages));
  }

  function getDummyMessages() {
    return [
      {
        id: 'dummy1',
        name: '초록바람',
        message: '이곳에 들어오기만 해도 숲속에 온 것처럼 마음이 정말 편안해지네요! 10가지 체크리스트 결과에 맞춰 주말에 숲에 꼭 가보려고 해요.',
        date: '2026년 8월 18일 오후 2:30',
        likes: 3
      },
      {
        id: 'dummy2',
        name: '건강마스터',
        message: '물 마시기랑 햇볕 쬐기를 늘 잊어버리곤 했는데, 오늘부터 다시 챙기기로 결심했습니다. 유용한 자연치유 정보 감사합니다!',
        date: '2026년 8월 17일 오전 10:15',
        likes: 5
      }
    ];
  }

  function renderMessages() {
    if (!container) return;

    const messages = getMessagesFromStorage();
    container.innerHTML = '';

    if (messages.length === 0) {
      container.innerHTML = `
        <div class="text-center py-10 text-gray-400">
          <i data-lucide="message-square-dashed" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p>첫 번째 방명록을 작성해 보세요. 당신의 따뜻한 발걸음을 남겨주세요.</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    messages.forEach(msg => {
      const card = document.createElement('div');
      card.className = 'guest-card p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold text-emerald-800 flex items-center gap-1">
              <i data-lucide="user" class="w-4 h-4 text-emerald-600"></i>
              ${escapeHTML(msg.name)}
            </h4>
            <span class="text-xs text-gray-400">${msg.date}</span>
          </div>
          <p class="text-gray-600 text-sm whitespace-pre-line leading-relaxed mb-4">
            ${escapeHTML(msg.message)}
          </p>
        </div>
        <div class="flex justify-between items-center border-t border-gray-50 pt-3">
          <button class="like-btn text-xs flex items-center gap-1 text-gray-500 hover:text-emerald-700 transition" data-id="${msg.id}">
            <i data-lucide="heart" class="w-4 h-4 text-rose-400 fill-current"></i>
            공감 <span>${msg.likes}</span>
          </button>
          <button class="delete-btn text-xs text-gray-300 hover:text-rose-500 transition" data-id="${msg.id}">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;

      // Attach button listeners
      const likeBtn = card.querySelector('.like-btn');
      const deleteBtn = card.querySelector('.delete-btn');

      if (likeBtn) {
        likeBtn.addEventListener('click', () => {
          likeMessage(msg.id);
        });
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          if (confirm('이 방명록 글을 삭제하시겠습니까?')) {
            deleteMessage(msg.id);
          }
        });
      }

      container.appendChild(card);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function likeMessage(id) {
    const messages = getMessagesFromStorage();
    const updated = messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, likes: msg.likes + 1 };
      }
      return msg;
    });
    saveMessagesToStorage(updated);
    renderMessages();
  }

  function deleteMessage(id) {
    let messages = getMessagesFromStorage();
    messages = messages.filter(msg => msg.id !== id);
    saveMessagesToStorage(messages);
    renderMessages();
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
