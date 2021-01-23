// Get the name of the called macro
let macroName = this.name
// Display a UI message if no actor is selected
if (!actor) {
    ui.notifications.warn(`An actor must be selected prior to calling the ${macroName} macro.`);
}
// Define the print message function
function printMessage(message){
	let chatData = {
	    user : game.user._id,
	    content : message,
	};
	ChatMessage.create(chatData,{})
}
// Get the selected tokens name and format it
let name = `<B>${token.actor.name}</B>`
// Define the Roll objects
let rConSave = new Roll(`1d20`).roll().total
let bConSave = token.actor.data.data.abilities.con.save
let tConSave = rConSave + bConSave
// Define some objects that will be used later
let drug = ''
let drugName = ''
let quality = ''
let qualityName = ''
let gathered = ''
let DC = ''
let duration = ''
let durationUnit = ''
let nat1 = '';
let failure = ''
let failure5 = ''
let passCheckExact = ''
let passCheck5 = ''
let nat20 = ''
let result = ''
let sideEffects = ''
let theHigh = ''
let message = `<H2>D.A.R.E.</H2>`
// Define the needed Object Arrays
let oaDC = [
    {dc: 15, quality: 'low-quality'},
    {dc: 12, quality: 'medium-quality'},
    {dc: 9, quality: 'high-quality'}
]
let oaDrugs = [
    {"name":"Bath Salts","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"• Unconscious<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•","side_effect(s)":"• ","preparation_method":"• ","consumption_method":"• ","the_high":"Violence , Paranoia , Agitation , Hallucinations , Psychosis , Racing heart , High blood pressure , Chest pain , Panic attacks , Dehydration , Kidney failure , Death"},
    {"name":"Cocaine","weight":"100mg","low quality (dc 15)":"1 sp","medium quality (dc 12)":"2 sp","high quality (dc 9)":"4 sp","duration":"1d4 * 10","duration_unit":"minutes","nat_1":"• Unconscious<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on Strength and Dexterity checks","nat_20":"• Advantage on Strength and Dexterity checks<P>• Strength and Dexterity checks have minimum of 10","side_effect(s)":"• Disadvantage on Charisma ability checks, saving throws, and attack rolls.","preparation_method":"• ","consumption_method":"• ","the_high":"Increased heart rate , High blood pressure , Increased body temperature , Stomach pain, nausea , Loss of appetite, malnourishment , Heart damage and heart attack , Stroke , Death , Loss of smell, nosebleeds, and problems swallowing , Higher risk of HIV and hepatitis C due to sharing needles or other drug equipment , When used during pregnancy it can cause spontaneous abortion, low birth weight, birth defects, and a baby born addicted to the drug"},
    {"name":"Ecstasy","weight":"1 tablet","low quality (dc 15)":"3 sp","medium quality (dc 12)":"6 sp","high quality (dc 9)":"1 gp","duration":"1d4","duration_unit":"hours","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on Charisma checks","nat_20":"• Advantage on Charisma checks<P>• Charisma checks have minimum of 10","side_effect(s)":"• Disadvantage on Wisdom ability checks, saving throws, and attack rolls.","preparation_method":"• ","consumption_method":"• ","the_high":"Increased heart rate , Increased blood pressure , Tense muscles , Nausea , Blurred vision , Dizziness , Sweating or chills"},
    {"name":"Flakka","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"• Unconscious<P>• Exhaustion (1 Level)• 1d8 slashing damage as you claw at yourself","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•","side_effect(s)":"• ","preparation_method":"• ","consumption_method":"• ","the_high":"What are the effects? The drug has a stimulant-like effect but can cause paranoia, hallucinations, and can lead to violence or self-harm. It’s been linked to deaths due to heart attack, suicide, and kidney damage or kidney failure."},
    {"name":"Heroin","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•","side_effect(s)":"• ","preparation_method":"• ","consumption_method":"• ","the_high":"Collapsed veins , Skin Infections , Gastrointestinal problems (especially constipation) , Kidney disease , Suppressed breathing, which is which is leading cause of coma, brain damage, and death , Risk of catching HIV and hepatitis C through sharing needles and other drug equipment , When used during pregnancy it can cause spontaneous abortion, low birth weight, birth defects, and a baby born addicted to the drug"},
    {"name":"Krokodil","weight":"","low quality (dc 15)":"","medium quality (dc 12)":"","high quality (dc 9)":"","duration":"","duration_unit":"","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"•","nat_20":"•","side_effect(s)":"• ","preparation_method":"• ","consumption_method":"• ","the_high":"What are the effects? Krokodil is named for the crocodile-like appearance it creates on the skin. Over time, it damages blood vessels and causes the skin to become green and scaly. The tissue damage can lead to gangrene and result in amputation or death."},
    {"name":"LSD","weight":"1 tablet","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d12","duration_unit":"hours","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on saving throws against Illusion spells","nat_20":"• Advantage on saving throws against Illusion spells<P>• Saving throws against Illusion spells have minimum of 10","side_effect(s)":"• Proficiency reduced to half","preparation_method":"• ","consumption_method":"• ","the_high":"What are the effects? It causes someone to see, hear, and feel things that seem real, but aren’t. These hallucinations, called “trips,” can last as long as 12 hours. , LSD can cause physical effects such as dilated pupils, increased heart rate and blood pressure, sweating, less appetite, dry mouth, and shakiness."},
    {"name":"Marijuana","weight":"1g","low quality (dc 15)":"1 sp","medium quality (dc 12)":"2 sp","high quality (dc 9)":"4 sp","duration":"1d6 * 10","duration_unit":"minutes","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on checks made with Tools, excluding Vehicles","nat_20":"• Advantage on checks made with Tools, excluding Vehicles<P>• Tool checks have a minimum of 10","side_effect(s)":"• Proficiency reduced to half","preparation_method":"• ","consumption_method":"• ","the_high":"What are the effects? Marijuana contains the chemical THC, which acts on different parts of the brain to create the “high” that users experience, such as changes in sensations, mood, body movements, thinking, and memory. , When used regularly, marijuana can affect brain development and lead to cognitive problems. It can become addictive for some people, and also cause serious health problems such as breathing issues, increased heart rate, and higher risk of heart attacks, depression, anxiety, and suicidal thoughts for some people. Among young people, heavy MJ use has been associated with cognitive impairment and mental illness, like schizophrenia. However, in adults, chronic use has not been associated with serious medical conditions."},
    {"name":"Methamphetamimes","weight":"10mg","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"2d8","duration_unit":"hours","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Gain resistance to slashing, piercing, and bludgeoning damage","nat_20":"• Gain resistance to slashing, piercing, and bludgeoning damage<P>• Advantage against being poisoned and on Strength checks and saving throws.","side_effect(s)":"• Proficiency reduced to 0","preparation_method":"• ","consumption_method":"• ","the_high":"Increased breathing , Rapid heart rate , High blood pressure , Increased body temperature"},
    {"name":"Mushrooms","weight":"1g","low quality (dc 15)":"1 sp","medium quality (dc 12)":"2 sp","high quality (dc 9)":"4 sp","duration":"1d6","duration_unit":"hours","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on saving throws against being frightened","nat_20":"• Advantage on saving throws against being frightened<P>• Saving throws against being frightened have minimum of 10","side_effect(s)":"• Proficiency reduced to half","preparation_method":"• ","consumption_method":"• ","the_high":"What are the effects? The effects start within about 20 minutes and last as long as 6 hours. Similar to LSD, mushrooms can cause hallucinations, an altered perception of time, and an inability to tell the difference between what’s real and what’s not., , Taking high doses or using them for a long time can cause panic, psychosis, or flashbacks. They can also cause extreme pupil dilation, nausea, and vomiting."},
    {"name":"Salvia","weight":"500mcg","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d6","duration_unit":"hours","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on saving throws against the Frightened condition","nat_20":"• Immunity to the Frightened condition","side_effect(s)":"• Disadvantage on Charisma ability checks, saving throws, and attack rolls.","preparation_method":"• ","consumption_method":"• ","the_high":"What are the effects? The drug creates intense but short-lived effects, which start within 5 to 10 minutes and last about 30 minutes. The hallucinogenic effects include changes in vision, mood, emotions, and body sensations. , Little is known about the health effects of salvia, though animal studies show it may have an impact on learning and memory. The Drug Enforcement Administration doesn’t consider salvia an illegal drug, but several states have passed laws to regulate its use."},
    {"name":"Spice","weight":"1g","low quality (dc 15)":"1 sp","medium quality (dc 12)":"2 sp","high quality (dc 9)":"4 sp","duration":"1d6 * 10","duration_unit":"minutes","nat_1":"• Incapacitated<P>• Exhaustion (1 Level)","failure_5_or_greater":"• Poisoned","failure":"• Poisoned","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on checks made with Tools, excluding Vehicles","nat_20":"• Advantage on checks made with Tools, excluding Vehicles<P>• Tool checks have a minimum of 10","side_effect(s)":"• Proficiency reduced to half","preparation_method":"• ","consumption_method":"• ","the_high":"What are the effects? Compounds in Spice act on the same parts in the brain as THC, the psychoactive ingredient in marijuana. As a result, the effects are very similar, such as feeling happier and more relaxed. But the compounds in Spice can lead to a stronger effect. , Users also report severe anxiety, paranoia, and hallucinations. , Other effects of Spice can include: , Rapid heart rate , Vomiting , Confusion , Seizures , Increased blood pressure , Heart attack (rarely)"},
    {"name":"Dragon Tears","weight":"10ml","low quality (dc 15)":"10 gp","medium quality (dc 12)":"20 gp","high quality (dc 9)":"40 gp","duration":"1d6","duration_unit":"hours","nat_1":"• Death<P>• Soul is captured by Tiamat, making resurrection impossible","failure_5_or_greater":"• Exhaustion (5 Levels)<P>• Incapacitated","failure":"• Exhaustion (3 Levels)<P>• Incapacitated","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on all saving throws","nat_20":"•Bonus applied is +2 instead of +1","side_effect(s)":"• Disadvantage on Death saving throws.<P>• Max HP reduced to half.","preparation_method":"• ","consumption_method":"With a Pastuer pipette, apply a drop to one of your eyes.","the_high":"The tears give you the might, confidence, and resolve of a dragon as they permeate through your veins. Every hour, you must succeed on an ever incrementing Constituion saving throw the same as the first one. E.G. if you consumed high-quality dragon's tears, then your first save is DC 9, next is DC 10, next is DC 11, and so on."},
    {"name":"Celestial Blood","weight":"10ml","low quality (dc 15)":"10 gp","medium quality (dc 12)":"20 gp","high quality (dc 9)":"40 gp","duration":"1d4","duration_unit":"minutes","nat_1":"• Incapacitated<P>• Exhaustion (3 Levels)","failure_5_or_greater":"• Incapacitated<P>• Exhaustion (1 Level)","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Add your Proficiency bonus twice when calculating your Spell Attack bonus and Spell Save DC.","nat_20":"• Add your Proficiency bonus twice when calculating your Spell Attack bonus and Spell Save DC.<P>• All aspects of all spells cast are doubled, E.G. duration, area, damage, etc.","side_effect(s)":"• Disadvantage on ability checks, saving throws, and attack rolls unless they are attack rolls for a spell.","preparation_method":"• ","consumption_method":"Imbibe the vial of blood.","the_high":"The blood cells of a celestial infect your blood cells like a virus, fusing to them, in doing so transfering their celestial power to you. Your eyes glow white, your skin turns a beautiful gold, and you shed dim white light in a 15-ft radius as all things you see shimmer with the holiness of celestial infection."},
    {"name":"Aberration Ichor","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"","duration_unit":"","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Aberration finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Aberration finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Your AC increased by 2.","nat_20":"• Your AC increased by 2.<P>• You gain a single-use randomly deteremined beholder eye ray.","side_effect(s)":"• Disadvantage on Charisma ability checks, saving throws, and attack rolls.","preparation_method":"• ","consumption_method":"Apply a pea-sized amount to your gums and rub it in gently and evenly.","the_high":"As the magic of aberrations flows through your body, your skin hardens and your body deforms, turning you into a much uglier version of yourself."},
    {"name":"Liquid Construct","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d6","duration_unit":"hours","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Construct finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Construct finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• You gain advantage on all tool checks.","nat_20":"• You gain advantage on all tool checks.<P>• You gain expertise in all tools.","side_effect(s)":"• Movement Speed halved","preparation_method":"• ","consumption_method":"Inject the liquid metal into your veins.","the_high":"The hand you use to manipulate tools transforms into a beatuiful '3D-prtined' style tool that you need."},
    {"name":"Dragon Scale Powder","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d4","duration_unit":"hours","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Dragon finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Dragon finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• You gain 2 uses of Legendary Resistance.","nat_20":"• You gain 2 uses of Legendary Resistance.<P>• You gain a breath attack that recharges on a roll of an 8 on 1d8. This breath attack scales with your level.","side_effect(s)":"• Your movement speed is halved.<P>• Disadvantage on Death saving throws.","preparation_method":"• ","consumption_method":"Snort dat shit.","the_high":"You skin glints with reflectivity of dragon scales and you reak of the elemental type of the dragon that was used to create this drug. Careful not to let this dragon consume you and be reborn in your place."},
    {"name":"Concentrated Elemental Essence","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d4","duration_unit":"minutes","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Elemental finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Elemental finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Your attacks deal an additional 1d6 damage. The type is determined by the elementals type the drug was made from.<P>• You gain resistance to this damage type","nat_20":"• Your attacks deal an additional 1d6 damage. The type is determined by the elementals type the drug was made from.<P>• You gain immunity to this damage type• All creatures hit with your attack gain vulnerability to the damage type for 1 minute.","side_effect(s)":"• You gain vulnerability to its opposite damage type and disadvantage on saving throws against spells or other effects that deal that damage type.","preparation_method":"• ","consumption_method":"Take the glowing tablet and place it under your tongue; wait for it to dissolve.","the_high":"As the element of the creature that was used to make this drug swirls around your body, it fuses itself into your very being and with every attack, it snaps towards your target dealing additional damage. Careful not to let this magic overtake your body, mind, and soul."},
    {"name":"Fey Bone Powder","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d4","duration_unit":"minutes","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Fey finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Fey finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Restore total spell slot levels equal to half your level.","nat_20":"• Restore total spell slot levels equal to your level.","side_effect(s)":"• You cannot cast cantrips","preparation_method":"• ","consumption_method":"Snort dat shit.","the_high":"Your body begins to glow with the feywild, its magic getting absorbed into your very soul, causing your skin to glow a faint green."},
    {"name":"Fiend Ichor","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d8","duration_unit":"hours","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Fiend finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Fiend finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• You impose disadvantage on checks and saves to creatures who are subject to being charmed by you","nat_20":"• You grant disadvantage on checks and saves to creatures who are subject to being charmed by you<P>• Any creature who touches you must make a Wisdom saving throw or be charmed by you.","side_effect(s)":"• Your movement speed is halved.","preparation_method":"• ","consumption_method":"Apply a pea-sized amount to your gums and rub it in gently and evenly.","the_high":"A fiendish charisma fills your soul and body as you grow higher and higher from this drug. Careful not to get charmed yourself, else you will become charmed by the fiend's soul who is inside you."},
    {"name":"Git Biggie","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d4","duration_unit":"hours","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Giant finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Giant finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• You grow by one size, gaining the benefts of that size. E.G. if your current size is Medium, you become Large.","nat_20":"• You grow by two sizes. E.G. if your current size is Medium, you become Huge.","side_effect(s)":"• Your proficiency bonus is halved","preparation_method":"• ","consumption_method":"Imbibe the vial of blood or snort dat shit.","the_high":"Ingesting giant blood or the dust of their ground up bones imparts their magical size onto you. Eveyrthing grows ;) Careful not to let it get out of control, less you explode."},
    {"name":"Ooze Slime","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"1d6","duration_unit":"hours","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Ooze finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Ooze finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• The ooze can move through a space as narrow as 1 inch wide without squeezing.","nat_20":"• Any nonmagical weapon made of metal that hits you corrodes. After dealing damage, the weapon takes a permanent and cumulative −1 penalty to damage rolls. If its penalty drops to −5, the weapon is destroyed. Nonmagical ammunition made of metal that hits you is destroyed after dealing damage.<P>• The ooze can move through a space as narrow as 1 inch wide without squeezing.","side_effect(s)":"• Movement speed is now 1/3 of your normal Movement speed.","preparation_method":"• ","consumption_method":"Apply it to your armpits and let it seep its way into your flesh.","the_high":"Snorting the prepared carcas of an ooze allows its magic to manifest within your and use your as a conduit."},
    {"name":"Undead Flesh","weight":"5ml","low quality (dc 15)":"2 sp","medium quality (dc 12)":"4 sp","high quality (dc 9)":"8 sp","duration":"2d8","duration_unit":"hours","nat_1":"• Incapacitated <P> • One of your hands or feet begins to turn into a(n) Undead finger/toe. (Mechanically, this is a curse that will kill you in [[1d6]] days.","failure_5_or_greater":"• Incapacitated <P> • One of your fingers or toes begins to turn into a(n) Undead finger/toe (Mechanically, this is a curse that will kill you in [[1d12]] days.","failure":"• Poisoned<P>• Exhaustion (1 Level)","pass_check_(exactly_on_dc)":"• Dependency<P>• Poisoned","pass_check_(5_or_above_dc)":"• Advantage on Death saving throws","nat_20":"• Advantage on Death saving throws<P>• Should you be subject to outright death, without the chance to roll Death saving throws, instead you get to roll your Death saving throws.","side_effect(s)":"• You lose the ability to speak and comprehend languages.","preparation_method":"• ","consumption_method":"Chew it. Swallow it. Keep it down.","the_high":"As undead essence fills your bloodstream, you increasingly feel invulnerable, you have gained a leg up on Death. "}
];
// The dropdown menu for the drug
let ddInitial1 = `<form action="/action_page.php">
                    <label for="narcotics">Choose a Narcotic:</label>
                    <select name="narcotics" id="narcotics"> 
                        <option value="bath-salts">Bath Salts (No Data)</option>
                        <option value="cocaine">Cocaine</option>
                        <option value="ecstasy">Ecstasy</option>
                        <option value="flakka">Flakka (No Data)</option>
                        <option value="heroin">Heroin (No Data)</option>
                        <option value="krokodil">Krokodil (No Data)</option>
                        <option value="lsd">LSD</option>
                        <option value="marijuana">Marijuana</option>
                        <option value="methamphetamimes">Methamphetamimes</option>
                        <option value="mushrooms">Mushrooms</option>
                        <option value="salvia">Salvia</option>
                        <option value="spice">Spice</option>
                        <option value="dragon-tears">Dragon Tears</option>
                        <option value="celestial-blood">Celestial Blood</option>
                        <option value="aberration">Aberration</option>
                        <option value="construct">Construct</option>
                        <option value="dragon">Dragon</option>
                        <option value="elemental">Elemental</option>
                        <option value="fey">Fey</option>
                        <option value="fiend">Fiend</option>
                        <option value="giant">Giant</option>
                        <option value="ooze">Ooze</option>
                        <option value="undead">Undead</option>
                    </select>
                </form>`;
// The dropdown menu for the drug quality
let ddInitial2 = `<form action="/action_page.php">
                    <label for="drug-quality">Select the Quality:</label>
                    <select name="drug-quality" id="drug-quality"> 
                        <option value="low-quality">Low Quality</option>
                        <option value="medium-quality">Medium Quaity</option>
                        <option value="high-quality">High Quality</option>
                    </select>
                </form>`;
// Create the initial dialog where the user selects the drug to be ingested
let dInitial = new Dialog ({
    title: "Recreational Drugs",
    content: ddInitial1 + ddInitial2,
    buttons: {
        ok: {
            id: "1",
            label: "Get High!",
            callback (html) {
                // Get the drug name and its value from user dropdown selection
                drug = html.find('#narcotics').val()
                drugName = document.getElementById("narcotics")
                drugName = drugName.options[drugName.selectedIndex].text
                // Get the drug quality name and its value from user dropdown selection
                quality = html.find('#drug-quality').val()
                qualityName = document.getElementById("drug-quality")
                qualityName = qualityName.options[qualityName.selectedIndex].text
                // Set the Difficulty Class based on quality
                DC = oaDC.find(i => i.quality == quality).dc
                // Pull from oaDrugs based on drugName
                duration = oaDrugs.find(i => i.name == drugName).duration
                durationUnit = oaDrugs.find(i => i.name == drugName).duration_unit
                nat1 = oaDrugs.find(i => i.name == drugName).nat_1
                failure = oaDrugs.find(i => i.name == drugName).failure
                failure5 = oaDrugs.find(i => i.name == drugName).failure_5_or_greater
                passCheckExact = oaDrugs.find(i => i.name == drugName)["pass_check_(exactly_on_dc)"]
                passCheck5 = oaDrugs.find(i => i.name == drugName)["pass_check_(5_or_above_dc)"]
                nat20 = oaDrugs.find(i => i.name == drugName).nat_20
                sideEffects = oaDrugs.find(i => i.name == drugName)["side_effect(s)"]
                theHigh = oaDrugs.find(i => i.name == drugName).the_high
                // Get the result based on rConSave and DC
                if (rConSave == 20) {
                    result = nat20 + `<P>• Yo high as a kite, mo'fucka!`
                } else if (rConSave == 1) {
                    result = nat1
                } else if (tConSave == DC) {
                    result = passCheckExact + `<P>• Yo high as a kite, mo'fucka!`
                } else if (tConSave >= DC + 5) {
                    result = passCheck5 + `<P>• Yo high as a kite, mo'fucka!`
                } else if (tConSave >= DC) {
                    result = `• Yo high as a kite, mo'fucka!`
                } else if (tConSave < DC) {
                    result = failure
                }
                // Log all variables to the console for debugging purposes
                console.log(`USER INPUTS
                            Drug: ${drug}
                            Drug Name: ${drugName}
                            Quality: ${quality}
                            Quality Name: ${qualityName}
                            Con. Save: ${rConSave}
                            Con. Save Total: ${tConSave}
                            DC: ${DC}
                            Duration: ${duration}`)
                // Append the message with the result and the above variables
                message += `<P>${name} ingests <I>${qualityName} ${drugName}</I> and suffers/benefits from the following effects for the next [[${duration}]] ${durationUnit}:
                            <P>${result} <P> ${sideEffects}
                            <P> <H3>The High</H3>
                            <P> ${theHigh}`
                // Print the message to chat
                printMessage(message)
            }
        }
    }
})
dInitial.render(true)