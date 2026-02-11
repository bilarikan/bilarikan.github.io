---
title: "Welcome to the New Site"
date: 2026-02-11T00:00:00-05:00
description: "The first post on the Hugo + Congo migration."
tags: ["hugo", "congo", "migration"]
categories: ["Website"]
draft: false
---

This is the first post after migrating `bil.arikan.ca` from Astro to Hugo with the Congo theme.

The goal of the migration is to keep writing friction low while preserving fast builds and simple deployment through GitHub Pages.

Below is an example of a mermaid diagram.

{{< mermaid >}}
graph LR;
A[Lemons]-->B[Lemonade];
B-->C[Profit]
{{< /mermaid >}}

Below is an example of a chart.js chart.

{{< chart >}}
type: 'bar',
data: {
  labels: ['Tomato', 'Blueberry', 'Banana', 'Lime', 'Orange'],
  datasets: [{
    label: '# of votes',
    data: [12, 19, 3, 5, 3],
  }]
}
{{< /chart >}}
