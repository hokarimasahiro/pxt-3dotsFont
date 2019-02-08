/**
 * 3Dots Fond Display blocks
 */
//% weight=100 color=#0fbc11 icon="\u270f" block="3Dots Font"
namespace FONT3DOTS {
    let LinePoint: number
    const AlfaStr: string = " !" + '"' + "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~"
    //    const AlfaStr: string = " !" + '"' + "#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_"
    const AlfaFont: string[] = ["@@@", "]@@", "X@X", "_J_", "J_J", "SDY", "JUK", "X@@", "NQ@", "QN@", "JDJ", "DND", "AB@", "DD@", "B@@", "CDX", "NQN", "I_A", "SUI", "QUK", "\D_", "]UR", "NUB", "PS\","JUJ","IUN","J@@","AJ@","DJQ","JJ@","QJD","PUH","NUO","OTO","_UJ","NQQ","_QN","_UQ","_TP","NUF","_D_","Q_Q","BQ^ ","_LS","_AA","_H_","_N_","_Q_","_TH","NSO","_TK","IUR","P_P","_A_","\C\","_B_","[D[","XGX","SUY","_QQ","XDC","QQ_","HPH","AAA","PH@","GJG","_EB","FII","BE_","NUI","DOT","IUJ","_DC","K@@","AAV","_BE","^ AA","ODO","OHG","FIF","OJD","DJO","GHH","EMJ","DOE","NAO","NAN","OBO","IFI","MCL","KMI","D_Q","_@@","Q_D","HDH"]
    let ScrollMode = 0    //0:Not Scroll,1:Scroll
    let ScrollSpeed = 500
    /**
     * TODO:文字列を表示する
     * @param pStr 文字列。, eg: "ABCDabcd"
     */
    //% block
    export function ShowString(pStr: string): void {
        let sp: number; let ep: number; let i: number; let j: number; let k: number
        let lines: number[] = []
        let Font: string
        for (i = 0; i < pStr.length; i++) {
            if (AlfaStr.indexOf(pStr.charAt(i)) >= 0) {
                Font = AlfaFont[AlfaStr.indexOf(pStr.charAt(i))]
                if (i > 0 && ScrollMode != 0) lines.push(0)
                if (ScrollMode == 0) {
                    sp = 0; ep = 4
                } else {
                    Font = ShiftFont(Font)
                    sp = 0
                    ep = GetFontSize(Font)
                }
                for (k = sp; k <= ep; k++) {
                    lines.push(Font.charCodeAt(k) - 0x64)
                }
            }
        }
        if (pStr.length == 1) {
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 5; j++) {
                    if ((lines[i] >>> (4 - j) & 0x01) != 0) led.plot(i, j)
                    else led.unplot(i, j)
                }
            }
            show()
        } else if (ScrollMode == 0) {
            for (i = 0; i < Math.trunc(lines.length / 5); i++) {
                for (j = 0; j < 5; j++) {
                    for (k = 0; k < 5; k++) {
                        if ((lines[i * 5 + j] >>> (4 - k) & 0x01) != 0) led.plot(j, k)
                        else led.unplot(j, k)
                    }
                }
                basic.pause(ScrollSpeed)
            }
        } else {
            for (i = 0; i < 5; i++) lines.push(0)	//区切りを追加する
            for (i = 0; i < lines.length; i++) {
                for (j = 0; j < 5; j++) {
                    for (k = 0; k < 5; k++) {
                        if ((lines[i] >>> (4 - k) & 0x01) != 0) led.plot(j, k)
                        else led.unplot(j, k)
                    }
                }
                basic.pause(ScrollSpeed)
            }
        }
    }
    function GetFontSize(f: string): number {
        for (let i = 4; i >= 0; i--) {
            if (f.charCodeAt(i) > 0x64) return i
        }
        return 0
    }
    function ShiftFont(f: string): string {
        for (let i = 0; i < 5; i++) {
            if (f.charCodeAt(i) > 0x64) return f.substr(i, 5 - i)
        }
        return "00"
    }
    /**
     * TODO:フォント文字列をビット列に変換する
     * @param f フォント文字列。, eg: ??DD0
     */
    //% block
    function Font2Number(f: string): number {
        let r = 0
        for (let i = 0; i < 5; i++) {
            r = r << 5 + f.charCodeAt(i) - 0x64
        }
        return r
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
    /**
     * TODO:数値を16進形式で表示する
     * @param n 数値。, eg: 0xab30
     */
    //% block
    function ShowHex(n: number): void {
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
