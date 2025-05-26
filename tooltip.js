document.addEventListener("DOMContentLoaded", () => {
  const waitForMathJax = () => {
    const promise = window.MathJax?.startup?.promise;
    if (promise) {
      promise.then(initTooltip);
    } else {
      setTimeout(waitForMathJax, 100);
    }
  };

  function initTooltip() {
    const tooltip = createOrReuseTooltip();
    let isPinned = false;
    let currentAnchor = null;
    let hideTimer = null;

    document.querySelectorAll('a[href*="mjx-eqn"]').forEach((anchor) => {
      anchor.addEventListener("mouseover", () => {
        if (!isPinned) showTooltip(anchor);
        clearHideTimer();
      });

      anchor.addEventListener("mouseout", scheduleHideTooltip);

      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (isPinned && currentAnchor === anchor) {
          unpinTooltip();
        } else {
          showTooltip(anchor, true);
        }
      });
    });

    tooltip.addEventListener("mouseover", clearHideTimer);
    tooltip.addEventListener("mouseout", scheduleHideTooltip);

    document.addEventListener("click", (event) => {
      if (isPinned && !tooltip.contains(event.target)) {
        unpinTooltip();
      }
    });

    function createOrReuseTooltip() {
      let el = document.querySelector(".mathjax-tooltip");
      if (!el) {
        el = document.createElement("div");
        el.className = "mathjax-tooltip";
        document.body.appendChild(el);
      }
      return el;
    }

    function showTooltip(anchor, pin = false) {
      const targetId = decodeURIComponent((anchor.getAttribute("href") || "").split("#")[1] || "");
      const ref = document.getElementById(targetId)?.closest("mjx-container, .MathJax");
      if (!ref) return;

      tooltip.innerHTML = "";
      tooltip.appendChild(ref.cloneNode(true));

      const tooltipWidth = tooltip.offsetWidth;
      const scrollLeft = window.scrollX;
      const scrollTop = window.scrollY;
      const top = anchor.getBoundingClientRect().bottom + 10 + scrollTop;

      const main = document.querySelector("main, #primary, .site-main");
      let left;

      if (main) {
        const mainRect = main.getBoundingClientRect();
        left = mainRect.left + scrollLeft + (mainRect.width - tooltipWidth) / 2;
      } else {
        // フォールバック：画面全体の中央
        left = (window.innerWidth - tooltipWidth) / 2 + scrollLeft;
      }

      Object.assign(tooltip.style, {
        top: `${top}px`,
        left: `${left}px`,
        visibility: "visible",
      });

      isPinned = pin;
      currentAnchor = anchor;
    }

    function hideTooltip() {
      tooltip.style.opacity = "0";
      setTimeout(() => {
        if (!isPinned) {
          tooltip.style.display = "none";
          tooltip.innerHTML = "";
          currentAnchor = null;
        }
      }, 200);
    }

    function unpinTooltip() {
      isPinned = false;
      currentAnchor = null;
      hideTooltip();
    }

    function scheduleHideTooltip() {
      if (isPinned) return;
      clearHideTimer();
      hideTimer = setTimeout(hideTooltip, 100);
    }

    function clearHideTimer() {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    }
  }

  waitForMathJax();
});
