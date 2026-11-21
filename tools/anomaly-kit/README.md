# AI异常调查所 · 制作工具包

账号：抖音「AI异常调查所」。内容：看起来像灵异/怪事 → 真相是科学，反差越大越好。
样板：examples/ep01-infrasound-ghost（用户认可的第一期，**竖屏**）。**以后一律横屏 1920×1080，30fps**，风格、节奏、声音完全照第一期。

## 流程（每期）
1. 选题：从 ../series_state.json 的 queue 头部取。先用 WebSearch 核实人物/地点/年份/数字；只是假说的机制在画面上标「（一种解释）」，悬案就说清「至今没有公认解释」。
2. 在 tools/anomaly-kit/ 下 `cp -r examples/ep01-infrasound-ghost ep_<英文短名>`，改 index.html：
   - 画布改为 `width=1920 height=1080`，W/H 常量同步改，Playwright viewport 改成 1920×1080（render.py / frames.py / 封面）。
   - 保留全部风格函数：bg / header / post（扫描线、暗角、颗粒、glitch）、cap（打字机字幕）、stamp（印章）、ghost、line、txt、rng 等。场景（room/person/vise/blade/eye…）按新题材重画成发光线稿。
   - header 里 `CASE #019` 和「档案：机器里的幽灵」改成本期编号（series_state.next_case_no，三位数）和案件名。
3. 横屏版式（避免重叠）：
   - 顶栏：y≈60 品牌+CASE+录制点，y≈92 细线，y≈122 时间码/档案名；左右边距 90。
   - 大标题 y≈220–300（72–110px），副标题 y≈330。
   - 主视觉 y 380–860；可用左图右字（主视觉 x 120–1100，说明文字 x 1200–1800）。
   - 字幕 y≈960（46–52px），底部留 60px。
4. 时间线（约 50 秒，T 对象）：
   hook 0 → lab 4.5 → night 10 → foil(蓄力) 16 → **hit 21（重击1：怪事被证据抓住，红字+抖屏）** → trace 25（追查） → **reveal 31（重击2：核心数字/原理，超大发光等宽字+示意图）** → eye 37（为什么人会看到/感到） → off 42（去掉源头，怪事消失，画面变暖） → end 45（金句「有些"鬼"，只是…」+「已结案」印章+出处+「评论区报案」）→ fin 50 淡黑。
   GLITCH 数组放每个切点。每 5–6 秒要有新信息。
5. 先 `python3 frames.py 2,8,12.5,14.6,18,22.5,27,30,33,36,40,44,48` 出关键帧，用 ffmpeg tile 拼图后自己看：文字不互相遮挡、不出画、标签不压线稿。至少修一轮。
6. audio.py：沿用合成配乐（A 小调 drone、心跳 10–21 加速、21/31/45 重击、21–42 秒 100BPM 律动、42 秒后转大调 pad），按新文案改 caps 列表（打字机 tick 的起点和字数）和特殊音效。不用 Vibe BGM。
7. 渲染：`python3 render.py`（前台等完，2 核约 3–5 分钟）→ concat → 与 audio.wav 混流成 mp4（+faststart）。抽 6 帧再看一眼。
8. 封面：在 index.html 里写 window.cover()（参照样板），横屏 1920×1080：两行大标题（米白问句 + 红色真相钩子）+ 场景线稿 + 绿色数字印章 + 顶栏。

## 推送规范
- mp4 → videos/YYYY-MM-DD-英文短名.mp4（日期用 America/New_York 当天）；封面 → videos/同名-cover.png；单文件 < 100MB。
- 根目录 videos.json 的 videos 数组**末尾追加**（不删已有）：
  {"id","file","cover","title","caption","tags","date"}；title=抖音标题（可带 emoji，有悬念），caption=抖音文案（讲清反差+结尾「评论区报案」），tags 恰好 3 个、不带 #，第一个固定「AI异常调查所」。
- 更新 tools/series_state.json：题目从 queue 移到 done（记 ep、case、id），next_case_no +1。
- commit 末尾加 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`，`git -c push.negotiate=true push origin HEAD:main`。
- 不要推到 Musevideo。

## 避坑
- draw(t) 必须完全由 t 决定：不用 Math.random / Date / requestAnimationFrame。
- window.ready 里先 document.fonts.load 各字体再 draw(0)；字体：Noto Serif CJK SC、Noto Sans CJK SC、DejaVu Sans Mono。
- 中文引号在 JS 字符串里用 \" 或「」，别把字符串截断。
- 每段 win() 淡入淡出写在 draw 里，不在 ffmpeg 里做转场。
