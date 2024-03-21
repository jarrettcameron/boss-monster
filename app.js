const heroes = [
    {
        name: 'Jarrett',
        type: 'dwarf',
        damage: 5,
        health: 100,
        level: 1
    },
    {
        name: 'Khile',
        type: 'elf',
        damage: 10,
        health: 50,
        level: 1
    },
    {
        name: 'Ross',
        type: 'elf',
        damage: 10,
        health: 50,
        level: 1
    }
]

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}

let gold = 0

function DrawBoss() {
    let bossHealthBar = document.getElementById('boss-health-bar')
    bossHealthBar.setAttribute("style", `width: ${(boss.health / boss.maxHealth) * 100}%`)

    let bossLevelElm = document.getElementById('boss')
    bossLevelElm.innerText = `LVL: ${boss.level}`
}

function DrawParty() {
    heroes.forEach(hero => {
        let heroElm = document.getElementById(hero.name)

        let heroHealthElm = heroElm.querySelector('#health')
        heroHealthElm.innerHTML = Math.max(hero.health, 0).toFixed(0)

        let heroLvlElm = heroElm.querySelector('#level')
        heroLvlElm.innerHTML = hero.level.toString()
    })

    let goldElm = document.querySelector("#gold")
    goldElm.innerHTML = `${gold}g`
}


function BuyPotion() {
    if (gold >= 25) {
        gold -= 25
        heroes.forEach(hero => {
            hero.health += 50
        })
        DrawParty()
    }

}

function BuyWeapon() {
    if (gold < 75) return
    gold -= 75
    heroes.forEach(hero => {
        hero.damage += 20
    });
    DrawParty()
}

function DamageBoss() {
    boss.health -= CalcPartyAttack()

    DrawBoss()

    if (boss.health <= 0) BossDied()
}

function BossDied() {
    boss.level++
    boss.maxHealth *= 1.2
    boss.health = boss.maxHealth
    boss.damage *= 1.2
    gold += Math.floor(5 * (.5 * boss.level))



    DrawBoss()
    DrawParty()
}

function CalcPartyAttack() {
    let partyAttack = 0

    heroes.forEach(hero => {
        partyAttack += hero.damage
    })

    return partyAttack
}

function DamageParty() {
    let gameOver = true
    heroes.forEach(hero => {
        hero.health -= boss.damage
        if (hero.health > 0) gameOver = false
    })

    if (gameOver) {
        alert("Game Over! Ur bad??? Cry about it??")
        window.location = "https://www.google.com/search?q=how+to+get+good+at+video+games&oq=how+to+get+good+at+video+games&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDMyNzNqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8"
    }

    DrawParty()
    BossBump()
}

function BossBump() {
    let bossImageElm = document.getElementById('boss-image')
    bossImageElm.classList.add("boss-attack")
    setTimeout(() => bossImageElm.classList.remove("boss-attack"), 250)
}


DrawBoss()
DrawParty()
setInterval(DamageParty, 5000)
