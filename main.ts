/**
 * 3Dots Fond Display blocks
 */
//% weight=100 color=#0fbc11 icon="\u270f" block="3Dots Font"
namespace FONT3DOTS {
    let rotate: number = 0
    /**
     * TODO:文字列を表示する
     * @param pStr 文字列。, eg: "ABCDabcd"
     * @param ss スクロール速度。, eg: 300
     */
    //% block
    export function showString(pStr: string, ss: number = 200, y: number = -1, r: number = 0): void {
        const AlfaFont: string[] = ["0", "0", "0", "0", "0", "0", "0", "0", "OEO", "1NDO", "92L29", "56O:A", "9:O:9", "9GOG9", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "M", "H0H", "O:O", ":O:", "B49", ":E;", "H", ">A", "A>", ":4:", "4>4", "12", "44", "2", "248", ">A>", "9O1", "CE9", "AE;", "L4O", "MEB", ">E2", "@CL", ":E:", "9E>", ":", "1:", "4:A", "::", "A:4", "@E8", ">E?", "?D?", "OE:", ">AA", "OA>", "OEA", "OD@", ">E6", "O4O", "AOA", "2AN", "O<C", "O11", "O8O", "O>O", "OAO", "OD8", ">C?", "OD;", "9EB", "@O@", "O1O", "N1N", "O2O", "K4K", "H7H", "CEI", "OA", "842", "AO", "8@8", "111", "19O91", "7:7", "O52", "699", "25O", ">E9", "4?D", "9E:", "O43", ";", "11F", "O25", "N11", "?4?", "?87", "696", "?:4", "4:?", "788", "5=:", "4?5", ">1?", ">1>", "?2?", "969", "=3<", ";=9", "4OA", "O", "AO4", "848"]
        let i: number; let j: number; let k: number
        let lines: number[] = []
        let Font: string

        for (i = 0; i < pStr.length; i++) {
            if ((pStr.charCodeAt(i) > 0) && (pStr.charCodeAt(i) < 0x7f)) {
                Font = AlfaFont[pStr.charCodeAt(i)]
                if (pStr.length == 1) {
                    if (Font.length < 5 && y != -1) {
                        if (y == 0) {
                            if (Font.length < 4) lines.push(0)
                            if (Font.length < 2) lines.push(0)
                        } else {
                            for (k = 5; k > Font.length; k--) {
                                lines.push(0)
                            }
                        }
                    }
                } else {
                    lines.push(0)
                }
                for (k = 0; k < Font.length; k++) {
                    lines.push(Font.charCodeAt(k) - 0x30)
                }
            }
        }
        if (pStr.length == 1) {
            basic.clearScreen()
            for (i = 0; i < lines.length; i++) {
                for (j = 0; j < 5; j++) {
                    if ((lines[i] >>> (4 - j) & 0x01) != 0) led.plot(i, j)
                    else led.unplot(i, j)
                }
            }
        } else {
            for (i = 0; i < 5; i++) lines.push(0)	//区切りを追加する
            for (i = 0; i < lines.length; i++) {
                scrollScreen(-1)
                for (j = 0; j < 5; j++) {
                    if ((lines[i] >>> (4 - j) & 0x01) != 0) led.plot(4, j)
                    else led.unplot(4, j)
                }
                basic.pause(ss)
            }
        }
    }
    /**
     * TODO:数字を表示する
     * @param n 数値。, eg: 500
     * @param ss スクロール速度。, eg: 300
     */
    //% block
    export function showNumber(n: number, ss: number = 300): void {
        showString(Math.roundWithPrecision(n, 2).toString(), ss, -1, 0)
    }
    /**
     * TODO:スクリーンをスクロールする
     * @param n スクロール桁数。, eg: -1
     */
    //% block
    export function scrollScreen(n: number): void {
        if ((n <= -5) || (n >= 5)) {
            basic.clearScreen()
            return
        } else if (n == 0) {
            return
        } else if (n < 0) {
            for (let i = 0; i <= 5 + n; i++) {
                for (let j = 0; j < 5; j++) {
                    if (led.point(i - n, j)) {
                        led.plot(i, j)
                    } else {
                        led.unplot(i, j)
                    }
                }
            }
        } else {
            for (let i = 4; i >= (n - 1); i--) {
                for (let j = 0; j < 5; j++) {
                    if (led.point(i - n, j)) {
                        led.plot(i, j)
                    } else {
                        led.unplot(i, j)
                    }
                }
            }
        }
    }
    /**
     * TODO:数値を16進形式で表示する
     * @param n 数値。, eg: 0xab30
     */
    //% block
    export function showHex(n: number): void {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 4; y++) {
                if ((n & 1 << (x * 4 + y)) != 0) {
                    led.plot(4 - y, 4 - x)
                } else {
                    led.unplot(4 - y, 4 - x)
                }
            }
        }
    }
}
