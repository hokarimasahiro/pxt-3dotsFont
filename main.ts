/**
 * 3Dots Fond Display blocks
 */
//% weight=100 color=#0fbc11 icon="\u270f" block="3Dots Font"
namespace FONT3DOTS {
    let LinePoint: number
    const AlfaStr: string = " !" + '"' + "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_" //`abcdefghijklmnopqrstuvwxyz{|}~"
    const AlfaFont: string[] = ["000", "M00", "H0H", "O:O", ":O:", "C4I", ":E;", "H00", ">A0", "A>0", ":4:", "4>4", "120", "440", "200", "34H", ">A>", "9O1", "CE9", "AE;", "L4O", "MEB", ">E2", "@CL", ":E:", "9E>", ":00", "1:0", "4:A", "::0", "A:4", "@E8", ">E?", "?D?", "OE:", ">AA", "OA>", "OEA", "OD@", ">E6", "O4O", "AOA", "2AN", "O<C", "O11", "O8O", "O>O", "OAO", "OD8", ">C?", "OD;", "9EB", "@O@", "O1O", "L3L", "O2O", "K4K", "H7H", "CEI", "OAA", "H43", "AAO", "8@8", "111", "@80", "7:7", "O52", "699", "25O", ">E9", "4?D", "9E:", "O43", ";00", "11F", "O25", "N11", "?4?", "?87", "696", "?:4", "4:?", "788", "5=:", "4?5", ">1?", ">1>", "?2?", "969", "=3<", ";=9", "4OA", "O00", "AO4", "848", "000"]
    let ScrollMode = 0    //0:Not Scroll,1:Scroll
    let ScrollSpeed = 500
    /**
     * TODO:文字列を表示する
     * @param pStr 文字列。, eg: "ABCDabcd"
     */
    //% block
    export function ShowString(pStr: string): void {
        let i: number; let j: number; let k: number
        let lines: number[] = []
        let Font: string

    basic.showString(pStr)
/*        for (i = 0; i < pStr.length; i++) {
            if (AlfaStr.indexOf(pStr.charAt(i)) >= 0) {
                Font = AlfaFont[AlfaStr.indexOf(pStr.charAt(i))]
                if (i > 0 && ScrollMode != 0) lines.push(0)
                for (k = 0; k < 3; k++) {
                    lines.push(Font.charCodeAt(k) - 0x30)
                }
            }
        }*/
/*        if (pStr.length == 1) {
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 5; j++) {
                    if ((lines[i] >>> (4 - j) & 0x01) != 0) led.plot(i, j)
                    else led.unplot(i, j)
                }
            }
        } else if (ScrollMode == 0) {
            for (i = 0; i < Math.trunc(lines.length / 3); i++) {
                for (j = 0; j < 3; j++) {
                    for (k = 0; k < 5; k++) {
                        if ((lines[i * 3 + j] >>> (4 - k) & 0x01) != 0) led.plot(j, k)
                        else led.unplot(j, k)
                    }
                }
                basic.pause(ScrollSpeed)
            }
        } else {
            for (i = 0; i < 5; i++) lines.push(0)	//区切りを追加する
            for (i = 0; i < lines.length - 5; i++) {
                for (j = 0; j < 5; j++) {
                    for (k = 0; k < 5; k++) {
                        if ((lines[i+ j] >>> (4 - k) & 0x01) != 0) led.plot(j, k)
                        else led.unplot(j, k)
                    }
                }
                basic.pause(ScrollSpeed)
            }
        }*/
    }
    /**
     * TODO:スクロース速度を設定する
     * @param n スクロール速度。, eg: 500
     */
    //% block
    export function SetScrollSpeed(n: number): void {
        ScrollSpeed = n
    }
    /**
     * TODO:スクロースモードを設定する
     * @param n スクロールモード。, eg: 0
     */
    //% block
    export function SetScrollMode(n: number): void {
        ScrollMode = n
    }
}
