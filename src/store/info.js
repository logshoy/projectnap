import * as fb from 'firebase'

export default {
    state: {
        info: {},
        commentedItem: []
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        setAvatar(state, avatar) {
            state.info.imageSrc = avatar
        },
        createCommentedItem(state, payload) {
            state.commentedItem.push(payload)
        },
        setCommentedItem(state, payload) {
            state.commentedItem = payload
        }
    },
    actions: {
        async changeAvatar({
            commit,
            getters
        }, payload) {
            try {
                console.log(payload.name)
                const uid = await getters.user.id
                const imageExt = payload.name.slice(payload.name.lastIndexOf('.'))
                console.log(imageExt)
                const fileData = await fb.storage().ref(`users/${uid}.${imageExt}`).put(payload)
                console.log(fileData)
                const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
                console.log(imageSrc)
                await fb
                    .database()
                    .ref(`/users/${uid}/info`)
                    .update({
                        imageSrc
                    })
                commit('setAvatar', imageSrc)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateInfo({
            commit,
            getters
        }, toUpdate) {
            try {
                const uid = await getters.user.id
                const updateData = {
                    ...getters.info,
                    ...toUpdate
                }
                await fb
                    .database()
                    .ref(`/users/${uid}/info`)
                    .update(updateData)
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchInfo({
            commit
        }, uid) {
            try {
                const info = (await fb
                    .database()
                    .ref(`/users/${uid}/info`)
                    .once('value')).val()
                commit('setInfo', info)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCommentedItem({
            commit
        }, uid) {
            try {
                const commentedItem = (await fb
                    .database()
                    .ref(`/users/${uid}/commentedItem`)
                    .once('value')).val()
                const arrayCommentItem = Object.keys(commentedItem)
                commit('setCommentedItem', arrayCommentItem)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        info: s => s.info,
        commentedItem(state) {
            return categoryId => {
                return state.commentedItem.includes(categoryId)
            }
        }
    }
}