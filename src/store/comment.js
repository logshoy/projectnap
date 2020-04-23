import * as fb from 'firebase'

class Comment {
    constructor(title, text, time, rating, uid) {
        this.title = title,
            this.text = text,
            this.time = time,
            this.rating = rating,
            this.uid = uid
    }
}
class giveComment {
    constructor(title, text, time, rating, uid, nickname, imageSrc) {
        this.title = title,
            this.text = text,
            this.time = time,
            this.rating = rating,
            this.uid = uid,
            this.nickname = nickname,
            this.imageSrc = imageSrc
    }
}

export default {
    state: {
        comments: []
    },
    mutations: {
        createComment(state,payload) {
            state.comments.push(payload)
        },
        loadComments(state, payload) {
            state.comments = payload
        },
        destroyComments(state) {
            state.comments = []
        }
    },
    actions: {
        async createComments({
            commit,
            getters
        }, {
            title,
            text,
            adId,
            time,
            rating
        }) {
            const options = {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
            const uid = await getters.user.id
            const format = new Intl.DateTimeFormat('ru-Ru', options).format(time);
            const parse = format.toString()
            const comment = new Comment(title, text, parse, rating, uid)
            const infoUid = getters.info
            const commentState = new giveComment(title, text, parse, rating, uid, infoUid.nickname, infoUid.imageSrc)
            commit('clearError')
            try {
                await fb.database().ref(`/ads/${adId}/comments`).push(comment)
                let update = {
                    [`/users/${uid}/commentedItem/${adId}`]: true,
                  }
                  await fb.database().ref().update(update)
            commit('createComment',commentState)
            commit('createCommentedItem',adId )
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
                const arr = Object.keys(comments)
                for (const item of arr) {
                    const c = comments[item]
                    const info = (await fb
                        .database()
                        .ref(`/users/${c.uid}/info`)
                        .once('value')).val()
                    resultComments.push(
                        new giveComment(c.title, c.text, c.time, c.rating, c.uid, info.nickname,
                            info.imageSrc)
                    )
                }
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