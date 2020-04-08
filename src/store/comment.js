import * as fb from 'firebase'

class Comment {
    constructor(title, text, time) {
        this.title = title,
            this.text = text,
            this.time = time
    }
}
export default {
    state: {
        comments: []
    },
    mutations: {
        loadComments(state, payload) {
            state.comments = payload
        },
        destroyComments(state) {
            state.comments = 0
        }
    },
    actions: {
        async createComments({
            commit
        }, {
            title,
            text,
            adId,
            time
        }) {
            const options = {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
            const format = new Intl.DateTimeFormat('ru-Ru', options).format(time);
            const parse = format.toString()
            const comment = new Comment(title, text, parse)
            commit('clearError')
            try {
                await fb.database().ref(`/ads/${adId}/comments`).push(comment)
            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        },

        async fetchComments({
            commit,
        }, {
            adId
        }) {
            commit('setLoading', true)
            commit('clearError')
            const resultComments = []

            try {
                const fbVal = await fb.database().ref(`/ads/${adId}/comments`).once('value')
                const comments = fbVal.val()

                Object.keys(comments).forEach(key => {
                    const c = comments[key]
                    resultComments.push(
                        new Comment(c.title, c.text, c.time, key)
                    )
                })
                commit('loadComments', resultComments)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
            }
        }
    },
    getters: {
        comments(state) {
            return state.comments
        }
    }
}