import * as fb from 'firebase'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        }
    },
    actions: {
        async updateInfo({
            commit
        }, {
            nickname,
            image
        }) {
            try {
                const uid = await this.getters.user.id
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const fileData = await fb.storage().ref(`users/${uid}.${imageExt}`).put(image)
                const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
                const updateData = {
                    nickname,
                    imageSrc
                }
                await fb
                    .database()
                    .ref(`/users/${uid}/info`)
                    .update(updateData)
                await fb.database().ref(`/users/${uid}/info`).update({
                    imageSrc
                })
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
    },
    getters: {
        info: s => s.info
    }
}