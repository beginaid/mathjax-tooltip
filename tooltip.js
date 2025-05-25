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
    const tooltip = createTooltip();
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

    function createTooltip() {
      const el = document.createElement("div");
      el.className = "mathjax-tooltip";
      document.body.appendChild(el);
      return el;
    }

    function showTooltip(anchor, pin = false) {
      const targetId = decodeURIComponent((anchor.getAttribute("href") || "").split("#")[1] || "");
      const ref = document.getElementById(targetId)?.closest("mjx-container, .MathJax");
      if (!ref) return;

      const rect = anchor.getBoundingClientRect();
      tooltip.innerHTML = "";
      tooltip.appendChild(ref.cloneNode(true));

      Object.assign(tooltip.style, {
        top: `${rect.bottom + 10 + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        display: "block",
        opacity: "0",
        pointerEvents: "none",
        transform: "translateY(4px)",
      });

      // Trigger reflow to ensure transition works
      void tooltip.offsetHeight;

      tooltip.style.opacity = "1";
      tooltip.style.pointerEvents = "auto";
      tooltip.style.transform = "translateY(0)";

      isPinned = pin;
      currentAnchor = anchor;
    }

    function hideTooltip() {
      tooltip.style.opacity = "0";
      tooltip.style.pointerEvents = "none";
      tooltip.style.transform = "translateY(4px)";
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
