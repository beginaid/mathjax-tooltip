# MathJax Tooltip

A lightweight, dependency-free tooltip system for MathJax equations, built with plain JavaScript and CSS.

<p align="center">
  <img src="mathjax-tooltip-demo.gif" alt="Demo GIF" style="width: 100%; max-width: 800px;">
</p>

## Features

- Hover over `\ref` or `\eqref` links to display a tooltip with the referenced equation
- Click to pin or unpin the tooltip
- Smooth, accessible transitions (keyboard-friendly and ARIA-compliant)
- No external dependencies

## Installation (via CDN)

Add the following to your HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/beginaid/mathjax-tooltip@main/tooltip.css" />
<script src="https://cdn.jsdelivr.net/gh/beginaid/mathjax-tooltip@main/tooltip.js"></script>
```

## Requirements

Configure MathJax with the following snippet:

```html
<script>
  MathJax = {
    tex: {
      tags: "ams", // required for \label, \eqref and \ref to work
    },
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>
```

## Example Usage with MathJax

Here is an example of a labeled equation and a corresponding reference using `\eqref`:

```latex
\begin{align}
a_{pq} = \frac{1}{(n_{p}-q)!} \lim_{x\to x_{p}} \frac{d^{n_{p}-q}}{dx^{n_{p}-q}} \left\{ (x-x_{p})^{n_{p}} \frac{P(x)}{Q(x)} \right\}
\label{eq:main}
\end{align}
```

You can reference this equation elsewhere in your document like so:

```latex
As shown in Equation \eqref{eq:main}, the coefficient $a_{pq}$ is computed by differentiating a weighted rational function.
```

This will produce a reference such as Equation (1).  
When a user hovers over “(1)”, a tooltip appears showing the full content of the referenced equation.

### Optional: HTML Embedding Example

If you are embedding MathJax equations directly in HTML, you might do:

```html
<div>
  <script type="math/tex; mode=display">
    \begin{align}
    a_{pq} = \frac{1}{(n_{p}-q)!} \lim_{x\to x_{p}} \frac{d^{n_{p}-q}}{dx^{n_{p}-q}} \left\{ (x-x_{p})^{n_{p}} \frac{P(x)}{Q(x)} \right\}
    \label{eq:main}
    \end{align}
  </script>
</div>
```

## Contributing

Found a bug or want to propose a feature?  
Feel free to [open an issue](https://github.com/beginaid/mathjax-tooltip/issues) or submit a pull request!

## License

MIT License © 2025 zuka
