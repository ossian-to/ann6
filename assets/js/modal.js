/*
  * 最後更新：2023/11/23 by ossian (ossian@ossian.tw)
  * 使用方式
  * 1. 載入 plugins/modal.scss
  * 2. 載入 assets/js/modal.js
  * 3. 在 HTML 的按鈕處設 <button onclick="modalNamespace.open('modalA')" aria-label="Open modalA">開啟modal A</button>
  *    其中，modalNamespace.open('modalA') 會對應 modal 的 ID
  * 4. 標準的 modal HTML 如下
        <div class="modal" id="modalA" role="dialog" aria-labelledby="modalATitle" aria-describedby="modalADesc">
          <!-- modal內容 -->
          <div class="modal-content">
            <span class="close-modal" aria-label="Close" role="button" onclick="modalNamespace.close()">×</span>
            <h2 id="modalATitle">歐森 A</h2>
            <p id="modalADesc">這是 modal A 的描述內容。</p>
          </div>
        </div>
  * 5. 詳細的使用方式請參考 https://codepen.io/ossian/pen/ExrmYPj
*/

const modalNamespace = (function () {

  // 按下 Esc 鍵觸發的事件處理函數
  function closeModalOnEscape(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  // 開啟和關閉 modal 的事件處理函數
  function handleModalClick(event) {
    const modal = event.target.closest(".modal");
    if (
      modal &&
      (event.target.matches(".close-modal, .modal") ||
        event.target.getAttribute("aria-label") === "Close")
    ) {
      closeModal();
    }
  }

  // 開啟 modal 的函數
  function openModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    modal.classList.add("show");

    // 使用統一的事件委派
    document.body.addEventListener("click", handleModalClick);
    // 按下 Esc 鍵關閉 modal
    document.addEventListener("keydown", closeModalOnEscape, { once: true });
    // 在 modal 打開時，將頁面內容標示為不可用
    document.body.setAttribute("aria-hidden", "true");
  }

  // 關閉 modal 的函數
  function closeModal() {
    const modals = document.querySelectorAll(".modal.show");
    modals.forEach((modal) => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "false");
    });

    // 解除事件委派
    document.body.removeEventListener("click", handleModalClick);

    // 在 modal 關閉時，將頁面內容標示為可用
    document.body.removeAttribute("aria-hidden");
  }

  return {
    open: openModal,
    close: closeModal,
  };

})();
