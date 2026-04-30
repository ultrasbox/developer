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

    class MyExtension {
        constructor() {
            this.boolVariables = {};
            this.isUIOpen = false;
        }

        getInfo() {
            return {
                id: 'BOOLVAREXTENSION',
                name: 'Bool変数拡張',
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
                        blockType: Scratch.BlockType.HAT, // BOOLEANブロック復活
                        text: 'bool値[variable]が[bool]になった時',
                        arguments: {
                            variable: { type: Scratch.ArgumentType.STRING, menu: 'boolVariableMenu' },
                            bool: { type: Scratch.ArgumentType.STRING, menu: 'staticBoolMenu' }
                        }
                    },
                    {
                        opcode: 'getallBool',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '全部のbool値を見る',
                    },
                    {
                        opcode: 'getallhatmap',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '全部のhatブロックの内部値を見る',
                    }
                ],
                menus: {
                    boolVariableMenu: { acceptReporters: true, items: 'getVariableMenuItems' },
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
                const blockId = util.thread.peekStack();
                this.boolVariables[args.variable] = {"bool": (args.bool === 'true')};
                updateValueBySpecificKey(args.variable,false)
            }
        }
        
        getBool(args){
const data = this.boolVariables[args.variable] ?? {"bool": false};
return !!data.bool; }
        getallBool(args) { return JSON.stringify(this.boolVariables); }
        ifBool(args,util){
            const blockId = util.thread.peekStack();
            const safeValue = dbMap.get(blockId)?.get(args.variable)?.get("hat") ?? false;
            const preValue = dbMap.get(blockId)?.get(args.variable)?.get("bool") ?? false;
            const bool = (args.bool == "true");
            if(safeValue == false && !!this.boolVariables[args.variable].bool == bool && bool != preValue){
                deleteInMap(blockId,args.variable);
                updateInMap(blockId,args.variable,new Map([["bool",(bool)],["hat",true]]));
                return true;
            }
            return false;
        }
        getallhatmap(args){
            return stringifyMap(dbMap);
        } 
    }

    Scratch.extensions.register(new MyExtension());
})(Scratch);