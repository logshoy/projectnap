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
            commit,
            getters
        }, toUpdate) {
            try {
                const uid = await this.getters.user.id
                console.log(uid)
                console.log(toUpdate.image, 'ss')
                const imageExt = toUpdate.image.name.slice(toUpdate.image.name.lastIndexOf('.'))
                const fileData = await fb.storage().ref(`users/${uid}.${imageExt}`).put(toUpdate.image)
                const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
                const updateData = {
                    ...getters.info,
                    ...toUpdate
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