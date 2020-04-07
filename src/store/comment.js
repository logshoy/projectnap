import * as fb from 'firebase'

class Comment {
    constructor(title, text) {
        this.title = title,
            this.text = text
    }
}
export default {
    state: {
        comments: []
    },
    mutations: {
        loadComments(state, payload) {
            state.orders = payload
        }
    },
    actions: {
        async createComments({
            commit
        }, {
            title,
            text,
            adId,
        }) {
            const comment = new Comment(title, text)
            commit('clearError')
            try {
                await fb.database().ref(`/ads/${adId}/comments`).push(comment)
            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        },

        async fetchComments({
            commit
        }, adId) {
            commit('setLoading', true)
            commit('clearError')
            const resultComments = []
            console.log(adId)
            const ad = Object.keys(adId)
            console.log(ad)
            try {
                const fbVal = await fb.database().ref(`/ads/${adId}/comments`).once('value')
                const comments = fbVal.val()
                console.log(comments)

                Object.keys(comments).forEach(key => {
                    const c = comments[key]
                    resultComments.push(
                        new Comment(c.title, c.text, key)
                    )
                })
                console.log(resultComments)
                commit('loadComments', resultComments)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
            }
        }
    },
    getters: {
        comments(state) {
            return state.comments
        }
    }
}