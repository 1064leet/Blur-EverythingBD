/**
 * @name BlurEverything
 * @description Automatically blurs all images, GIFs, and videos in chat until hovered. No edge leaking.
 * @version 1.0.0
 * @author 1064leet
 * @authorId 648135444168572929
 * @website https://github.com/1064leet/Blur-EverythingBD
 * @source https://github.com/1064leet/Blur-EverythingBD/blob/main/BlurEverything.plugin.js
 */

module.exports = class BlurEverything {
    start() {
        const style = document.createElement("style");
        style.id = "BlurEverythingStyle";
        style.innerHTML = `
            /* 1. Base Blur with Clip-Path (No edge leaking) */
            [class*="imageWrapper"] {
                filter: blur(50px) !important;
                transition: filter 0.2s ease !important;
                clip-path: inset(0% round 8px) !important; 
            }

            /* 2. Hover Reveal */
            [class*="imageWrapper"]:hover {
                filter: blur(0px) !important;
                clip-path: inset(0% round 8px) !important;
            }

            /* 3. Modal/Fullview Exceptions */
            [class*="focusLock"] [class*="imageWrapper"],
            [class*="modal-"] [class*="imageWrapper"],
            [class*="visualizer-"] [class*="imageWrapper"] {
                filter: none !important;
                clip-path: none !important;
            }

            /* 4. Interface UI Protection (Guilds & Sidebar) */
            [class*="guilds"] [class*="imageWrapper"], 
            [class*="sidebar"] [class*="imageWrapper"] {
                filter: none !important;
                clip-path: none !important;
            }
        `;
        document.head.append(style);
    }
    stop() {
        const style = document.getElementById("BlurEverythingStyle");
        if (style) style.remove();
    }
};
