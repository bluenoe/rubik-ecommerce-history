#!/bin/bash

# B1: Khởi tạo repo mới
git init
git branch -M main

# B2: Add source code thật
git add .
git commit --date="2024-07-01T12:00:00" -m "feat: initialize next.js project with typescript and tailwind css"

# B3: Danh sách commit messages
messages=(
  "feat: implement shadcn/ui component system"
  "feat: design comprehensive database schema with prisma"
  "feat: implement nextauth.js with multiple providers"
  "feat: create comprehensive api routes for products and categories"
  "feat: build responsive header with search and cart functionality"
  "feat: design homepage with interactive 3d rubik cube"
  "feat: implement product cards and featured products section"
  "feat: develop shopping cart with zustand state management"
  "feat: build products page with advanced filtering and sorting"
  "feat: add comprehensive product filtering system"
  "feat: implement category grid with product counts"
  "feat: create testimonials section with customer reviews"
  "feat: implement newsletter subscription with email validation"
  "feat: design comprehensive footer with links and social media"
  "feat: add dark/light theme support with next-themes"
  "feat: integrate stripe payment processing"
  "style: implement custom animations and neumorphism design"
  "chore: setup environment variables and configuration files"
  "perf: optimize components and fix next.js configuration"
)

# B4: Lặp qua từng commit message và tạo commit lùi ngày
i=1
for msg in "${messages[@]}"
do
  DATE=$(date -d "2024-07-01 +$i days" +'%Y-%m-%dT12:00:00')
  export GIT_AUTHOR_DATE="$DATE"
  export GIT_COMMITTER_DATE="$DATE"
  git commit --allow-empty -m "$msg"
  ((i++))
done

echo "✅ Git history created với commit giả lập theo từng ngày!"
