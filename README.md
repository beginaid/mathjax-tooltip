# MathJax Tooltip

Lightweight tooltip system for MathJax equations using plain JavaScript and CSS.

## Features

- Hover to show a tooltip for `\ref` and `\eqref` links
- Click to pin/unpin the tooltip
- Smooth transitions
- Fully accessible and dependency-free

## CDN Usage (via jsDelivr)

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/beginaid/mathjax-tooltip@v1.0.0/tooltip.css"
/>
<script src="https://cdn.jsdelivr.net/gh/beginaid/mathjax-tooltip@v1.0.0/tooltip.js"></script>
```

## Example Usage with MathJax

Here is an example of a labeled equation and
how to reference it using `\eqref`:

```latex
\begin{align}
a_{pq} = \frac{1}{(n_{p}-q)!}\lim_{x\to x_{p}}\frac{d^{n_{p}-q}}{dx^{n_{p}-q}}\left\{(x-x_{p})^{n_{p}}\frac{P(x)}{Q(x)}\right\}
\label{eq:main}
\end{align}
```

You can refer to the equation elsewhere in your document using a LaTeX reference such as:

```latex
As shown in Equation\eqref{eq:main}, the coefficient $a_{pq}$ is computed by differentiating a weighted rational function.
```

This will produce a reference like **Equation (1)**.
When users hover over the reference link, a tooltip will display the full equation content.

## License

MIT License © 2025 zuka
