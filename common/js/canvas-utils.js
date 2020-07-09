/**
 * @说明：工具集
 * @作者：陈万照
 * @公司：山东标梵互动技术有限公司
 * @官网：http://biaofun.com/
 * @版本：v1.0.0
 * @时间：2020年4月28日11:28:13
 */
export default {
	/*
	 * canvas文字换行
	 * @param {String }str 要绘制的字符串
	 * @param {CanvasContext} ctx canvas对象
	 * @param {Number} initX 绘制字符串起始x坐标
	 * @param {Number} initY 绘制字符串起始y坐标
	 * @param {Number} lineHeight 字行高，自己定义个值即可
	 * @param {Number} canvasWidth 画布的宽度
	 */
	canvasTextAutoLine(str,ctx, initX, initY, lineHeight,canvasWidth) {
	    const arrText = str.split('')//字符串分割为数组
	    let currentText = ''// 当前字符串及宽度
	    let currentWidth
	    for (let letter of arrText) {
	        currentText += letter
	        currentWidth = ctx.measureText(currentText).width
	        if (currentWidth > canvasWidth) {
	            ctx.fillText(currentText, initX, initY)
	            currentText = ''
	            initY += lineHeight
	        }
	    }
	    if (currentText) {
	        ctx.fillText(currentText, initX, initY)
	    }
	},

}
