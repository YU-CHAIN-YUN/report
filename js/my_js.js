// 換背景按鈕
function changeBackground(gradient, borderColor) {
    document.body.style.background = gradient; // 設置背景顏色
    const button = document.getElementById("dropdownMenuButton");
    button.style.background = gradient; // 設置按鈕背景
    button.style.borderColor = borderColor; // 設置按鈕邊框顏色
  }

  // 事件委派：監聽整個 body，避免局限於單一 gallery
  document.body.addEventListener("click", function (event) {
    if (
      event.target.tagName === "IMG" &&
      event.target.closest(".gallery")
    ) {
      const modalImage = document.getElementById("modalImage");
      const modalDescription = document.getElementById("modalDescription");
      const modalTitle = document.getElementById("imageModalLabel");

      // 更新模態框的圖片和標題
      modalImage.src = event.target.src;
      modalImage.alt = event.target.alt;
      modalTitle.textContent = event.target.alt; // 更新模態框的標題為卡片名稱

      // 解析並顯示圖片對應的描述
      const description = JSON.parse(event.target.dataset.description);

      // 格式化顯示每個段落
      const keywordSection = `<p class="section-title">關鍵詞</p><p class="section-content">${description.keyword}</p>`;
      const uprightSection = `<p class="section-title">正位</p><p class="section-content">${description.upright}</p>`;
      const reversedSection = `<p class="section-title">逆位</p><p class="section-content">${description.reversed}</p>`;
      const meaningSection = `<p class="section-title">牌面含義</p><p class="section-content">${description.meaning}</p>`;

      // 更新模態框的內容
      modalDescription.innerHTML =
        keywordSection + uprightSection + reversedSection + meaningSection;
    }
  });

  // 塔羅牌意框
  function expandImage(title, content, imageUrl) {
    document.getElementById("expanded-title").innerText = title;
    document.getElementById("expanded-content").innerText = content;
    document.getElementById("expanded-image").src = imageUrl;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("expanded").style.display = "block";
  }

  function closeExpanded() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("expanded").style.display = "none";
  }

  // 懸浮按鈕(回到最上層)
  // 當用戶滾動時，顯示或隱藏按鈕
  window.onscroll = function () {
    const button = document.getElementById("scrollToTopBtn");
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };

  // 當按鈕被點擊時，滾動回到最上層並播放爬升動畫
  document.getElementById("scrollToTopBtn").onclick = function () {
    const button = document.getElementById("scrollToTopBtn");
    button.classList.add("climbing");

    // 延遲滾動到最上層，與動畫同步
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);

    // 在動畫結束後移除 class
    setTimeout(() => {
      button.classList.remove("climbing");
    }, 5000);
  };

  // 抽牌系統
  // 塔羅牌圖片列表
  const tarotImages = [
    "./image/大阿卡那(22張)/0愚者.webp",
    "./image/大阿卡那(22張)/1魔術師.webp",
    "./image/大阿卡那(22張)/2女祭師.webp",
    "./image/大阿卡那(22張)/3皇后.webp",
    "./image/大阿卡那(22張)/4皇帝.webp",
    "./image/大阿卡那(22張)/5教皇.webp",
    "./image/大阿卡那(22張)/6戀人.webp",
    "./image/大阿卡那(22張)/7戰車.webp",
    "./image/大阿卡那(22張)/8力量.webp",
    "./image/大阿卡那(22張)/9隱者.webp",
    "./image/大阿卡那(22張)/10命運之輪.webp",
    "./image/大阿卡那(22張)/11正義.webp",
    "./image/大阿卡那(22張)/12倒吊人.webp",
    "./image/大阿卡那(22張)/13死神.webp",
    "./image/大阿卡那(22張)/14節制.webp",
    "./image/大阿卡那(22張)/15惡魔.webp",
    "./image/大阿卡那(22張)/16高塔.webp",
    "./image/大阿卡那(22張)/17星星.webp",
    "./image/大阿卡那(22張)/18月亮.webp",
    "./image/大阿卡那(22張)/19太陽.webp",
    "./image/大阿卡那(22張)/20審判.webp",
    "./image/大阿卡那(22張)/21世界.webp",
    "./image/小阿卡那(56張)/聖杯/Cups01.webp",
    "./image/小阿卡那(56張)/聖杯/Cups02.webp",
    "./image/小阿卡那(56張)/聖杯/Cups03.webp",
    "./image/小阿卡那(56張)/聖杯/Cups04.webp",
    "./image/小阿卡那(56張)/聖杯/Cups05.webp",
    "./image/小阿卡那(56張)/聖杯/Cups06.webp",
    "./image/小阿卡那(56張)/聖杯/Cups07.webp",
    "./image/小阿卡那(56張)/聖杯/Cups08.webp",
    "./image/小阿卡那(56張)/聖杯/Cups09.webp",
    "./image/小阿卡那(56張)/聖杯/Cups10.webp",
    "./image/小阿卡那(56張)/聖杯/Cups11.webp",
    "./image/小阿卡那(56張)/聖杯/Cups12.webp",
    "./image/小阿卡那(56張)/聖杯/Cups13.webp",
    "./image/小阿卡那(56張)/聖杯/Cups14.webp",
    "./image/小阿卡那(56張)/錢幣/Pents01.webp",
    "./image/小阿卡那(56張)/錢幣/Pents02.webp",
    "./image/小阿卡那(56張)/錢幣/Pents03.webp",
    "./image/小阿卡那(56張)/錢幣/Pents04.webp",
    "./image/小阿卡那(56張)/錢幣/Pents05.webp",
    "./image/小阿卡那(56張)/錢幣/Pents06.webp",
    "./image/小阿卡那(56張)/錢幣/Pents07.webp",
    "./image/小阿卡那(56張)/錢幣/Pents08.webp",
    "./image/小阿卡那(56張)/錢幣/Pents09.webp",
    "./image/小阿卡那(56張)/錢幣/Pents10.webp",
    "./image/小阿卡那(56張)/錢幣/Pents11.webp",
    "./image/小阿卡那(56張)/錢幣/Pents12.webp",
    "./image/小阿卡那(56張)/錢幣/Pents13.webp",
    "./image/小阿卡那(56張)/錢幣/Pents14.webp",
    "./image/小阿卡那(56張)/寶劍/Swords01.webp",
    "./image/小阿卡那(56張)/寶劍/Swords02.webp",
    "./image/小阿卡那(56張)/寶劍/Swords03.webp",
    "./image/小阿卡那(56張)/寶劍/Swords04.webp",
    "./image/小阿卡那(56張)/寶劍/Swords05.webp",
    "./image/小阿卡那(56張)/寶劍/Swords06.webp",
    "./image/小阿卡那(56張)/寶劍/Swords07.webp",
    "./image/小阿卡那(56張)/寶劍/Swords08.webp",
    "./image/小阿卡那(56張)/寶劍/Swords09.webp",
    "./image/小阿卡那(56張)/寶劍/Swords10.webp",
    "./image/小阿卡那(56張)/寶劍/Swords11.webp",
    "./image/小阿卡那(56張)/寶劍/Swords12.webp",
    "./image/小阿卡那(56張)/寶劍/Swords13.webp",
    "./image/小阿卡那(56張)/寶劍/Swords14.webp",
    "./image/小阿卡那(56張)/權杖/Wands01.webp",
    "./image/小阿卡那(56張)/權杖/Wands02.webp",
    "./image/小阿卡那(56張)/權杖/Wands03.webp",
    "./image/小阿卡那(56張)/權杖/Wands04.webp",
    "./image/小阿卡那(56張)/權杖/Wands05.webp",
    "./image/小阿卡那(56張)/權杖/Wands06.webp",
    "./image/小阿卡那(56張)/權杖/Wands07.webp",
    "./image/小阿卡那(56張)/權杖/Wands08.webp",
    "./image/小阿卡那(56張)/權杖/Wands09.webp",
    "./image/小阿卡那(56張)/權杖/Wands10.webp",
    "./image/小阿卡那(56張)/權杖/Wands11.webp",
    "./image/小阿卡那(56張)/權杖/Wands12.webp",
    "./image/小阿卡那(56張)/權杖/Wands13.webp",
    "./image/小阿卡那(56張)/權杖/Wands14.webp",
  ];

  // 隨機抽牌函數
  function drawRandomCard() {
    // 隨機選擇一張塔羅牌
    const randomIndex = Math.floor(Math.random() * tarotImages.length);
    const randomImage = tarotImages[randomIndex];

    // 顯示圖片
    const cardElement = document.getElementById("random-card");
    cardElement.src = randomImage;

    // 顯示卡片區域並加上動畫
    const tarotCardDiv = document.getElementById("tarot-card");
    tarotCardDiv.style.display = "block";
    tarotCardDiv.classList.remove("card-animation"); // 移除舊動畫
    void tarotCardDiv.offsetWidth; // 觸發重排，確保動畫可以重新啟動
    tarotCardDiv.classList.add("card-animation");
  }

  // 綁定按鈕事件
  document
    .getElementById("draw-card-btn")
    .addEventListener("click", drawRandomCard);