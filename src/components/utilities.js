// utilities.js

export const drawRect = (boxes, classes, scores, threshold, width, height, ctx) => {
    for (let i = 0; i <= boxes.length; i++) {
        if (scores[i] > threshold) {
            const [y, x, height, width] = boxes[i];

            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(
                x * width,
                y * height,
                (width - x) * width,
                (height - y) * height
            );

            const text = `${classes[i]}: ${(scores[i] * 100).toFixed(1)}%`;
            ctx.font = "18px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(text, x * width, y * height);
        }
    }
};
