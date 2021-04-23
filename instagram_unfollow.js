// HOW TO RUN IT ON GOOGLE CHROME
// 1. OPEN INSTAGRAM
// 2. OPEN LIST OF FOLLOWERS
// 3. OPEN DEVELOPER TOOLS
// 4. COPY EVERYTHING HERE CTRL + A
// 5. PASTE EVERYTHING IN DEVELOPER TOOLS CONSOLE
// 6. CLICK ENTER
// THERE YOU WILL SOON HAVE NO FRIENDS

const FOLLOWING_BUTTON_TEXT = 'Following' // CHANGE THIS TO YOUR LANGUAGE
const UNFOLLOW_BUTTON_TEXT = 'Unfollow' // THIS TOO
const MAX_ATTEMPTS_PER_UNFOLLOW = 3 // BUMP THIS IF YOU HAVE WOODEN PC

const unfollowUser = () => {
    const followingButton = document
        .evaluate(`//button[text()="${FOLLOWING_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue
    if (followingButton) {
        console.log('Found following button. Clicking ...')
        followingButton.click()
        console.log('Clicked following button.')
        let unfollowButton = document.evaluate(`//button[text()="${UNFOLLOW_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        let attempts = 1
        while (attempts < MAX_ATTEMPTS_PER_UNFOLLOW && !unfollowButton) {
            console.log(`Attempted to find unfollowButton but could not. Retry #${attempts++}`)
            unfollowButton = document.evaluate(`//button[text()="${UNFOLLOW_BUTTON_TEXT}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        }
        if (attempts < MAX_ATTEMPTS_PER_UNFOLLOW) {
            console.log('Found unfollow button. Scrolling and clicking ...')
            unfollowButton.scrollIntoView(true)
            unfollowButton.click()
        } else {
            console.log(`Retried ${MAX_ATTEMPTS_PER_UNFOLLOW} times and didn't succeed`)
        }
        return false
    }
    return true
}

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const randomTimeout = () => (Math.floor((Math.random() * 10) + 1) * 1000) + 30000

const unfollowAll = async () => {
    let shouldStop = false
    while (!shouldStop) {
        shouldStop = unfollowUser()
        const unfollowTimeout = randomTimeout()
        console.log(`Waiting ${unfollowTimeout} seconds. Should stop: ${shouldStop}.`)
        await timeout(unfollowTimeout)
    }
    console.log('You follow no one.')
}

unfollowAll()
