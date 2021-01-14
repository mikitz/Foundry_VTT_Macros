/**
 * Takes all selected tokens and adds them to the combat tracker. Then rolls initiative for all tokens.
 */

if (!canvas.tokens.controlled) {
  ui.notifications.warn("Please select some tokens.");
} else {
  async function start() {
    for ( let token of canvas.tokens.controlled) {      
      if (token.inCombat === false){
        // Change 'rollAll' to 'rollNPC' if you want to roll for only NPCs.
        await token.toggleCombat().then(() => game.combat.rollAll('1d20', {rollMode: 'gmroll'}));
      }
    }
    game.combat.startCombat();
  }
  start()
}
