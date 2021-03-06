# Aquaponic Cycling Tracker :fish: :seedling: :tropical_fish:
### With a D3.js (version 5) multiline line graph visualisation in React/Redux



Please [check out](https://aquaponic-cycler.herokuapp.com) the working version :sparkles:



If you are cycling an Aquaponic System, you can make an account and start tracking the growth of your food producing bacterial colonies. You fish will thank you (for not prematurely killing them due to negligence).

For :question:, :beetle: or feature requests I'm at @FishPlantFish on twitter. The next feature on the list is to include system supplements records, so that you can visualise when certain supplements were added and what impact they had on system health.



PS: You might have found your way here looking for a **D3 v5 multi-line-graph** :chart_with_upwards_trend:. I was unable to find anything like it online, so feel free to copy pasta mine and adapt for your needs. :spaghetti:

You can find it in src/components/D3LineGraph.js. Note the default props at the base of the file, you can pass in your own if you like.


:fish: :seedling: :tropical_fish:


Installation:

You will not be able to run this project locally without first setting up your own firestore db.


Built with:
- React/Redux 
- D3.js (v5) for visualisations
- firebase firestore as db
- firebase/google auth
- node, express
- deployed with heroku

Relevant 3rd party docs:

[d3-tip](https://www.npmjs.com/package/d3-tip)

