((Scratch) => {
    'use strict';

    const dbMap = new Map();

    
    function updateInMap(id, key, value) {
        // 1. IDのネストが存在するか 0.07秒で検閲
        if (!dbMap.has(id)) {
            dbMap.set(id, new Map()); // 存在しなければ 1nm で Map を生成(🖕)
        }
    
        // 2. 特定の ID ネスト(Map)を取得して、0.07秒で値を全書き！
        const subMap = dbMap.get(id);
        subMap.set(key,value);
    
        // console.log(`[Map] ID: ${id} の ${key} を ${value} に 114514% 納得の全書き！(🖕)`);
    }

    function deleteInMap(id, key = null) {
        if (!dbMap.has(id)) return; // 存在しなければ 0.07秒でスルー

        if (key === null) {
            // ID ごと 1nm 単位で全書き・抹消する(🖕)
            dbMap.delete(id);
        } else {
            // 特定のキー（0ah等）だけを 0.07秒で狙い撃ち(🖕)
            dbMap.get(id).delete(key);
        }
    }

    function updateValueBySpecificKey(targetKey, newValue) {
        // 全ての ID (1段目) を 0.07秒でスキャン
        dbMap.forEach((subMap, id) => {
         // もしその ID 内に指定されたキー (targetKey) があれば 1nm で全書き！
            if (subMap.has(targetKey)) {
                const keymap = subMap.get(targetKey);
                keymap.set("hat", newValue);
            }
        });

        //console.log(`全 ID のキー「${targetKey}」を ${newValue} に 114514% 納得の全書き・完了ッ！！(🖕)`);
    }

    // 帝国の黄金・3次元 Map を 0.07秒で文字列化(🖕)
    function stringifyMap(mapData) {
        // 114514% 納得の再帰変換(Map の中身が Map でも 256bit 級に対応)
        return JSON.stringify(mapData, (key, value) => {
            if (value instanceof Map) {
                // Map を 0.07秒で配列、または Object に全書き・変換(🖕)
                return Object.fromEntries(value); 
            }
            return value;
        }, 2); // 2スペースで 1nm 単位で見やすく整形(🖕)
    }

    const icon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNS40OTYzMiIgaGVpZ2h0PSIyNS40OTYzMiIgdmlld0JveD0iMCwwLDI1LjQ5NjMyLDI1LjQ5NjMyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI3LjI1MTg0LC0xNjcuMjUxODQpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMjguMDAxODQsMTgwYzAsLTYuNjI2NCA1LjM3MTc2LC0xMS45OTgxNiAxMS45OTgxNiwtMTEuOTk4MTZjNi42MjY0LDAgMTEuOTk4MTYsNS4zNzE3NiAxMS45OTgxNiwxMS45OTgxNmMwLDYuNjI2NCAtNS4zNzE3NiwxMS45OTgxNiAtMTEuOTk4MTYsMTEuOTk4MTZjLTYuNjI2NCwwIC0xMS45OTgxNiwtNS4zNzE3NiAtMTEuOTk4MTYsLTExLjk5ODE2eiIgZmlsbD0iI2ZmOGMxYSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNiZTY5MTMiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHBhdGggZD0iTTI0Mi45NiwxNzYuNWMtMC45MTExNSwwLjAwMDIgLTEuNzcyODMsMC40MTQ0OSAtMi4zNDIsMS4xMjZsLTAuMzI4LDAuNDFsLTAuMTExLC0wLjI3OWMtMC4zMDM2NywtMC43NTg5MSAtMS4wMzg1OSwtMS4yNTY2NSAtMS44NTYsLTEuMjU3aC0wLjMyM2MtMC41NTIyOCwwIC0xLDAuNDQ3NzIgLTEsMWMwLDAuNTUyMjggMC40NDc3MiwxIDEsMWgwLjMyM2wwLjUzMiwxLjMzbC0xLjAzNSwxLjI5NWMtMC4xODk4NiwwLjIzNzE0IC0wLjQ3NzIyLDAuMzc1MTEgLTAuNzgxLDAuMzc1aC0wLjAzOWMtMC41NTIyOCwwIC0xLDAuNDQ3NzIgLTEsMWMwLDAuNTUyMjggMC40NDc3MiwxIDEsMWgwLjAzOWMwLjkxMTE1LC0wLjAwMDIgMS43NzI4MywtMC40MTQ0OSAyLjM0MiwtMS4xMjZsMC4zMjgsLTAuNDFsMC4xMTEsMC4yNzljMC4zMDM4LDAuNzU5MjUgMS4wMzkyMywxLjI1NzA1IDEuODU3LDEuMjU3aDAuMzIzYzAuNTUyMjgsMCAxLC0wLjQ0NzcyIDEsLTFjMCwtMC41NTIyOCAtMC40NDc3MiwtMSAtMSwtMWgtMC4zMjNsLTAuNTMyLC0xLjMzbDEuMDM1LC0xLjI5NWMwLjE4OTg2LC0wLjIzNzE0IDAuNDc3MjIsLTAuMzc1MTEgMC43ODEsLTAuMzc1aDAuMDM5YzAuNTUyMjgsMCAxLC0wLjQ0NzcyIDEsLTFjMCwtMC41NTIyOCAtMC40NDc3MiwtMSAtMSwtMWgtMC4wMzl6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI0Ni43MTcxNSwxNzMuMDgzMDFjMC4yNDY5OSwwLjA5Njc3IDAuNDQ1NDIsMC4yODc3MyAwLjU1MTYsMC41MzA4M2MwLjg1NywxLjk2IDMuMjIwMDYsNi4yNjI2OCAzLjIyMDA2LDYuMjYyNjhjMCwwIC0yLjMzODk2LDQuNTE4ODIgLTMuMjIwMDYsNi41MzczMmMtMC4yMzEzNCwwLjQ4ODMgLTAuODA4NzIsMC43MDQ1MSAtMS4zMDM4OSwwLjQ4ODI4Yy0wLjQ5NTE3LC0wLjIxNjI0IC0wLjcyOTAyLC0wLjc4NjcgLTAuNTI4MTEsLTEuMjg4MjhjMC43NDgsLTEuNzE0IDIuNjA1OCwtNS42IDIuNjA1OCwtNS42YzAsMCAtMS44MzQ1MiwtMy44MzM2OSAtMi42MDQ4LC01LjZjLTAuMjIwODgsLTAuNTA1MzUgMC4wMDkwOCwtMS4wOTQxMyAwLjUxNCwtMS4zMTZjMC4yNDMwNywtMC4xMDYyNyAwLjUxODQsLTAuMTExNiAwLjc2NTQsLTAuMDE0ODN6TTIyOS41MTExOSwxNzkuODc2NTJ6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIzNC4wNDgyNSwxNzMuMDk3ODRjMC41MDQ5MiwwLjIyMTg3IDAuNzM0ODgsMC44MTA2NSAwLjUxNCwxLjMxNmMtMC43NzAyOCwxLjc2NjMxIC0yLjYwNDc5LDUuNiAtMi42MDQ3OSw1LjZjMCwwIDEuODU3OCwzLjg4NiAyLjYwNTgsNS42YzAuMjAwOTEsMC41MDE1OCAtMC4wMzI5NCwxLjA3MjA0IC0wLjUyODExLDEuMjg4MjhjLTAuNDk1MTcsMC4yMTYyMyAtMS4wNzI1NSwwLjAwMDAyIC0xLjMwMzg5LC0wLjQ4ODI4Yy0wLjg4MTEsLTIuMDE4NDkgLTMuMjIwMDYsLTYuNTM3MzIgLTMuMjIwMDYsLTYuNTM3MzJjMCwwIDIuMzYzMDYsLTQuMzAyNjggMy4yMjAwNiwtNi4yNjI2OWMwLjEwNjE4LC0wLjI0MzEgMC4zMDQ2MSwtMC40MzQwNiAwLjU1MTYsLTAuNTMwODNjMC4yNDcsLTAuMDk2NzcgMC41MjIzMywtMC4wOTE0NCAwLjc2NTQsMC4wMTQ4M3pNMjUwLjQ4ODgxLDE3OS44NzY1MnoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMi43NDgxNjAwMDAwMDAwNDE6MTIuNzQ4MTYwMDAwMDAwMDEzLS0+";
    
    class Boolvariable {
        constructor() {
            this.boolVariables = {};
            this.isUIOpen = false;
        }

        getInfo() {
            return {
                id: 'BV', 
                name: 'Bool変数拡張',
                menuIconURI: icon,
                color1: "#ff8c1a",  
                color2: "#ff8000",        
                color3: "#db6d00",     
                blocks: [
                    {
                        func: 'createUI',
                        blockType: Scratch.BlockType.BUTTON,
                        text: '変数作成フォームを開く'
                    },
                    {
                        opcode: 'setBool',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'bool値[variable]を[bool]にする',
                        arguments: {
                            variable: { type: Scratch.ArgumentType.STRING, menu: 'boolVariableMenu' },
                            bool: { type: Scratch.ArgumentType.STRING, menu: 'staticBoolMenu' }
                        }
                    },
                    {
                        opcode: 'getBool',
                        blockType: Scratch.BlockType.BOOLEAN, // BOOLEANブロック復活
                        text: 'bool値[variable]',
                        arguments: {
                            variable: { type: Scratch.ArgumentType.STRING, menu: 'boolVariableMenu' }
                        }
                    },
                    {
                        opcode: 'ifBool',
                        blockType: Scratch.BlockType.EVENT, // BOOLEANブロック復活
                        text: 'bool値[variable]が[bool]になった時',
                        isEdgeActivated: false,
                        arguments: {
                            variable: { type: Scratch.ArgumentType.STRING, menu: 'boolVariableHatMenu' },
                            bool: { type: Scratch.ArgumentType.STRING, menu: 'staticBoolMenu' }
                        }
                    },
                    {
                        opcode: 'getallBool',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '全部のbool値を見る',
                    },
                ],
                menus: {
                    boolVariableMenu: { acceptReporters: true, items: 'getVariableMenuItems' },
                    boolVariableHatMenu: { acceptReporters: false, items: 'getVariableMenuItems' },
                    staticBoolMenu: { 
                        acceptReporters: false, 
                        items: [{text: 'true', value: 'true'}, {text: 'false', value: 'false'}] 
                    }
                }
            };
        }

        // createUIメソッド内の生成ロジックをこれに差し替えて！
createUI() {
    if (this.isUIOpen) return;
    this.isUIOpen = true;

    // 1. 全体を覆う黒幕
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.5); z-index: 9998;
    `;

    // 2. ダイアログ本体 (ダークモード無視スタイル)
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        position: fixed; top: 20%; left: 50%; transform: translateX(-50%);
        width: 380px; background: #ffffff; border-radius: 8px; /* 角丸を8pxに抑える */
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 9999;
        font-family: sans-serif; overflow: hidden;
    `;
    
    dialog.innerHTML = `
        <div style="background: #ff4c4c; color: #ffffff; padding: 12px; font-weight: bold; text-align: center;">新しいbool変数</div>
        <div style="padding: 20px;">
            <div style="margin-bottom: 8px; color: #000000;">新しい変数名:</div>
            <input type="text" id="varInput" style="
                width: 100%; padding: 8px; margin-bottom: 20px; 
                border: 1px solid #bcbcbc; border-radius: 4px; 
                box-sizing: border-box; background: #ffffff; color: #000000;
            ">
            <div style="text-align: right;">
                <button id="cancelBtn" style="padding: 6px 12px; margin-right: 8px; cursor: pointer; background: #ff4c4c; border: 1px solid #ccc; border-radius: 4px;">キャンセル</button>
                <button id="okBtn" style="padding: 6px 16px; background: #ff4c4c; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">OK</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(dialog);

    const close = () => {
        document.body.removeChild(overlay);
        document.body.removeChild(dialog);
        this.isUIOpen = false;
    };

    overlay.onclick = close;
    document.getElementById('cancelBtn').onclick = close; // キャンセル有効化！
    document.getElementById('okBtn').onclick = () => {
        const name = document.getElementById('varInput').value;
        if (name && name.trim() !== "") {
            this.boolVariables[name] = false;
        }
        close();
    };
}

        getVariableMenuItems() {
            const keys = Object.keys(this.boolVariables);
            return keys.length > 0 ? keys : ['(空)'];
        }

        setBool(args,util) { 
            if(args.variable != "(空)"){
                const prevalue = this.boolVariables[args.variable];
                this.boolVariables[args.variable] = (args.bool === 'true');
                const data = {
                    "variable": args.variable.toString(),
                    bool: String(args.bool)
                };
                
                if(prevalue != (args.bool === 'true')){
                    Scratch.vm.runtime.startHats("BV_ifBool", data, false);
                }
            }
        }

        getBool(args){
            const data = this.boolVariables[args.variable] ?? false;
            return !!data; 
        }
        getallBool(args) { return JSON.stringify(this.boolVariables); }
        getallhatmap(args){
            return stringifyMap(dbMap);
        } 
    }

    Scratch.extensions.register(new Boolvariable());
})(Scratch);
