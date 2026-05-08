((Scratch) => {
    // --- (ة) 新しい GAS URL にすり替え完了だッ！！ ---
    const GAS_URL = "https://script.google.com/macros/s/AKfycbzmDnUkS7Qa_gvpdk2vKrZ34JSpT0YEZbDdfsEefchdmubcyTl3tTc_d4HHKvK6AyX9Jg/exec";

    const MyExtensionInfo = {
        id: 'YAMAKIAUTH',
        name: 'oh猫戦・クラウドログイン',
        blocks: [
            {
                opcode: 'openLogin',
                blockType: Scratch.BlockType.COMMAND,
                text: 'ログイン窓を開く',
            },
            {
                opcode: 'getSavedUser',
                blockType: Scratch.BlockType.REPORTER,
                text: '保存されたユーザー名',
            },
            {
                opcode: 'logout',
                blockType: Scratch.BlockType.COMMAND,
                text: 'ログアウトする'
            },
            '---', 
            {
                opcode: 'saveToDB',
                blockType: Scratch.BlockType.COMMAND,
                text: '[TYPE] の [KEY] に [VALUE] を保存',
                arguments: {
                    TYPE: { type: Scratch.ArgumentType.STRING, menu: 'tableMenu', defaultValue: 'status' },
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'progress' },
                    VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '5' }
                }
            },
            {
                opcode: 'loadFromDB',
                blockType: Scratch.BlockType.REPORTER,
                text: '[TYPE] の [KEY] を読み込む',
                arguments: {
                    TYPE: { type: Scratch.ArgumentType.STRING, menu: 'tableMenu', defaultValue: 'status' },
                    KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'progress' },
                }
            },
{
                opcode: 'getresponse',
                blockType: Scratch.BlockType.REPORTER,
                text: 'レスポンス',
            }
        ],
        menus: {
            tableMenu: {
                acceptReporters: true,
                items: ['status', 'users']
            }
        }
    };

    class MyExtension {
        getInfo() { return MyExtensionInfo; }

        async saveToDB(args) {
            const uid = localStorage.getItem('yamaki_user_id');
            if (!uid) return "未ログイン";

            
const queryArray = [ `mode=write`, 
`type=${args.TYPE}`, 
`user_id=${uid}`, // ← お前が上に置きたい方を先に書くッ！ 
`key=${args.KEY}`,
`value=${args.VALUE}`, 
`ajax=true` ]; const queryString = queryArray.join('&');
            try {
                const response = await fetch(`${GAS_URL}?${queryString}`);
                const data = await response.json();
                sessionStorage.setItem('yamaki_response',JSON.stringify(data));
                return data.status === "200" ? "成功" : "失敗";
            } catch (e) { return "ERR"; }
        }

        async loadFromDB(args) {
            const uid = localStorage.getItem('yamaki_user_id');
            if (!uid) return "未ログイン";

            // (ة) こう書き換えれば、順番は「不動の守り」になるッ！！
const queryArray = [ `mode=read`, 
`type=${args.TYPE}`, 
`user_id=${uid}`, // ← お前が上に置きたい方を先に書くッ！ 
`key=${args.KEY}`, 
`ajax=true` 
];
const queryString = queryArray.join('&');

            try {
                const response = await fetch(`${GAS_URL}?${queryString}`);
                const data = await response.json();
                sessionStorage.setItem('yamaki_response',JSON.stringify(data));
                return data.value !== undefined ? data.value : "NO_DATA";
            } catch (e) { return "ERR"; }
        }

        openLogin() {
            const width = 400; const height = 600;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;
            window.open('https://yamaki3970.f5.si/api/login.php', 'yamaki_login', `width=${width},height=${height},top=${top},left=${left}`);
            this.setupListener();
        }

        logout() {
            window.open('https://yamaki3970.f5.si/api/logout.php', 'yamaki_logout', 'width=1,height=1,top=1000,left=1000');
            this.setupListener();
        }

        setupListener() {
            if (window.yamakiListenerAdded) return;
            window.addEventListener('message', (event) => {
                if (event.origin !== 'https://yamaki3970.f5.si') return;
                const data = event.data;
                if (data.type === 'LOGIN_COMPLETE') {
                    localStorage.setItem('yamaki_user_name', data.user_name);
                    localStorage.setItem('yamaki_user_id', data.user_id);
                } else if (data.type === 'LOGOUT_COMPLETE') {
                    localStorage.removeItem('yamaki_user_name');
                    localStorage.removeItem('yamaki_user_id');
                }
            });
            window.yamakiListenerAdded = true;
        }

        getSavedUser() { return localStorage.getItem('yamaki_user_name') || "未ログイン"; }
getresponse() { return sessionStorage.getItem('yamaki_response') || "レスポンスがありません"; }
    }
    
 
    Scratch.extensions.register(new MyExtension());
})(Scratch);