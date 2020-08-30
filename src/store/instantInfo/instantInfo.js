

const now = new Date();
// store.watch(function (state) {
//     return state.sessions
// }, function (val) {
//     console.log('CHANGE: ', val);
//     localStorage.setItem('vue-chat-session', JSON.stringify(val));
// }, {
//     deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
// })

export default {
    namespaced: true,
    state: {
        sessions: [
            {
                id: 1,
                user: {
                    name: '示例介绍',
                    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                messages: [{
                    content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                    date: now,
                    msgType: 'text'
                }, {
                    content: '项目地址(原作者): https://github.com/coffcer/vue-chat',
                    date: now,
                    msgType: 'text'
                }, {
                    content: '本项目地址(重构): https://github.com/is-liyiwei',
                    date: now,
                    msgType: 'text'
                },
                {
                    content: 'http://132.232.18.227:8081/download?url=upload/2f0f54f336734c0708225ed54cae54f9.mp4',
                    date: now,
                    msgType: 'video'
                },
                {
                    content: 'http://132.232.18.227:8081/download?url=upload/eef6b533f6cc298fa163a4f2fa204cfb.wav',
                    date: now,
                    msgType: 'audio'
                }]
            },
            {
                id: 2,
                user: {
                    name: 'webpack',
                    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                messages: [{
                    content: 'Hi，我是webpack哦',
                    date: now,
                    msgType: 'text'
                },
                {
                    content: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    date: now,
                    msgType: 'img'
                },
                {
                    content: 'http://132.232.18.227:8081/download?url=upload/2f0f54f336734c0708225ed54cae54f9.mp4',
                    date: now,
                    msgType: 'video'
                },
                {
                    content: 'http://132.232.18.227:8081/download?url=upload/eef6b533f6cc298fa163a4f2fa204cfb.wav',
                    date: now,
                    msgType: 'audio'
                }
                ]
            },
            {
                id: 3,
                user: {
                    name: 'test',
                    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                messages: [
                    {
                        content: 'http://132.232.18.227:8081/download?url=upload/eef6b533f6cc298fa163a4f2fa204cfb.wav',
                        date: now,
                        msgType: 'audio'
                    }
                ]
            }],
        currentSessionId: 3,
        filterKey: ''
    },
    getters: {

    },
    mutations: {
        changeCurrentSessionId(state, id) {
            state.currentSessionId = id;
        },
        addMessage(state, msg) {
            state.sessions.forEach(item => {
                if (item.id == state.currentSessionId) {
                    item.messages.push({
                        content: msg.content,
                        date: new Date(),
                        self: true,
                        msgType: msg.msgType
                    })
                }
            });
        },
        addPerson(state, person) {
            state.sessions.unshift({
                id: person.id,
                user: {
                    name: person.name,
                    img: person.img
                },
                messages: []
            })
            state.currentSessionId = person.id
        },
        INIT_DATA(state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        }
    },
    actions: {
        initData(context) {
            context.commit('INIT_DATA')
        }
    }


};