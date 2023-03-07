require('colors');
const request = require("request");
const fs = require('fs');
const prompts = require('prompts');
const { apiKey } = require("./config.json");
let athena = JSON.parse(fs.readFileSync('./dont_delete_this_file.json'));
(async () => {
console.log("Made by BF8 if you need help join discord: https://discord.gg/xkdYypXtHh".magenta)

    const choice1 = await prompts([
        {
            type: 'select',
            name: 'data',
            message: 'Select What you want to generate',
            choices: [
                { title: 'All cosmetics', value: 'allcos' },
                { title: 'New cosmetics', value: 'newcos' },
                { title: 'Sets', value: 'sets' },
                { title: 'Dynamic Pak', value: 'pak' }
            ],
        }
    ]);


    if (choice1.data === 'newcos') {
        request(`https://fortnitecentral.genxgames.gg/api/v1/aes`,
            async function (error, response) {
                var version = JSON.parse(response.body)['version']
                request(`https://fortniteapi.io/v2/items/list?added.version=${version}`, { 'headers': { 'Authorization': apiKey} }, async function (error, response2) {
                    var data = JSON.parse(response2.body)
                    if (data.error) {
                        console.log(data.error.code)
                    } else {
                    for (const item of data['items']) {
                        if(item.type.id === "bundle" || item.type.id === "battlebus" || item.type.id === "bannertoken" || item.type.id === "cosmeticvariant"){
                
                        }else{
                            if (item.id.toLowerCase().includes("random")) return;
                            if(item.type.id === "backpack"){
                                var  backendValue = "AthenaBackpack"
                              }else if (item.type.id === "outfit"){
                                  var  backendValue = "AthenaCharacter"
                              }else if (item.type.id === "emote"){
                                  var  backendValue = "AthenaDance"
                              }else if (item.type.id === "pickaxe"){
                                  var  backendValue = "AthenaPickaxe"
                              }else if (item.type.id === "spray"){
                                  var  backendValue = "AthenaSpray"
                              }else if (item.type.id === "loadingscreen"){
                                  var  backendValue = "AthenaLoadingScreen"
                              }else if (item.type.id === "emoji"){
                                  var  backendValue = "AthenaEmoji"
                              }else if (item.type.id === "glider"){
                                  var  backendValue = "AthenaGlider"
                              }else if (item.type.id === "wrap"){
                                var  backendValue = "AthenaItemWrap"
                            }else if (item.type.id === "music"){
                                var backendValue = "AthenaMusicPack"
                            }
                          
                   
                            let id = `${backendValue}:${item.id}`;
                            let variants = [];
                    
                            if (item.styles) {
                                item.styles.forEach(obj => {
                                    variants.push({
                                        "channel": obj.channel || "",
                                        "active": obj.tag || "",
                                        "owned": obj.map(variant => variant.tag || "")
                                    })
                                })
                            }
                            athena.items[id] = {
                                "templateId": id,
                                "attributes": {
                                    "max_level_bonus": 0,
                                    "level": 1,
                                    "item_seen": true,
                                    "xp": 0,
                                    "variants": variants,
                                    "favorite": false
                                },
                                "quantity": 1
                            }
                            
                        }
                    }
                    fs.writeFileSync("./profile_athena.json", JSON.stringify(athena, null, 2));
                    console.log("profile athena is done!".green)
                    }

                })

            })
    }else if (choice1.data === 'sets'){
        request(`https://fortniteapi.io/v2/items/sets?lang=en`,{'headers': {'Authorization': apiKey}},
        async function (error, response) {
            var data = JSON.parse(response.body)
            if (data.error) {
                console.log(data.error.code)
            } else {
            const choices = [];
            for (const set of data['sets']) {
            choices.push({ title: set.name, value: set.id });
            }
            const response2 = await prompts([
                {
                  type: 'text',
                  name: 'data',
                  message: 'please enter the set name',
                }
              ]);
              request(`https://fortniteapi.io/v2/items/list?set.name=${response2.data}`,{'headers': {'Authorization': apiKey}},
             async function (error, response2) {
            var data2 = JSON.parse(response2.body)
                if(data2.pages === 0){
                    console.log("please enter correct name".red)

                }else{
                    for (const item of data2['items']) {
                        if(item.type.id === "bundle" || item.type.id === "battlebus" || item.type.id === "bannertoken" || item.type.id === "cosmeticvariant"){
                
                        }else{
                            if (item.id.toLowerCase().includes("random")) return;
                            if(item.type.id === "backpack"){
                                var  backendValue = "AthenaBackpack"
                              }else if (item.type.id === "outfit"){
                                  var  backendValue = "AthenaCharacter"
                              }else if (item.type.id === "emote"){
                                  var  backendValue = "AthenaDance"
                              }else if (item.type.id === "pickaxe"){
                                  var  backendValue = "AthenaPickaxe"
                              }else if (item.type.id === "spray"){
                                  var  backendValue = "AthenaSpray"
                              }else if (item.type.id === "loadingscreen"){
                                  var  backendValue = "AthenaLoadingScreen"
                              }else if (item.type.id === "emoji"){
                                  var  backendValue = "AthenaEmoji"
                              }else if (item.type.id === "glider"){
                                  var  backendValue = "AthenaGlider"
                              }else if (item.type.id === "wrap"){
                                var  backendValue = "AthenaItemWrap"
                            }else if (item.type.id === "music"){
                                var backendValue = "AthenaMusicPack"
                            }
                          
                   
                            let id = `${backendValue}:${item.id}`;
                            let variants = [];
                    
                            if (item.styles) {
                                item.styles.forEach(obj => {
                                    variants.push({
                                        "channel": obj.channel || "",
                                        "active": obj.tag || "",
                                        "owned": obj.map(variant => variant.tag || "")
                                    })
                                })
                            }
                            athena.items[id] = {
                                "templateId": id,
                                "attributes": {
                                    "max_level_bonus": 0,
                                    "level": 1,
                                    "item_seen": true,
                                    "xp": 0,
                                    "variants": variants,
                                    "favorite": false
                                },
                                "quantity": 1
                            }
                            
                        }
                    }
                    fs.writeFileSync("./profile_athena.json", JSON.stringify(athena, null, 2));
                    console.log("profile athena is done!".green)
                }
                    
                    



                



      })
              
    }})
    }else if(choice1.data === 'pak'){
        request(`https://fortnitecentral.genxgames.gg/api/v1/aes`, async function (error, response) {
            const Keys = JSON.parse(response.body)['dynamicKeys']
            const choices = [];
            for (const pak of Keys) {
            choices.push({ title: pak.name, value: pak.name });
            }
            const response3 = await prompts([
                {
                  type: 'select',
                  name: 'data',
                  message: 'Pick a Pak',
                  choices: choices
                }
              ]);
              let noname = response3.data.replace(/-WindowsClient|pakchunk|.utoc/gi, "");
              request(`https://fortnitecentral.genxgames.gg/api/v1/assets/dynamic/${noname}`, async function (error, response2) {
                const data2 = JSON.parse(response2.body)
                for (const item of data2) {
                    if (item.startsWith("FortniteGame/Content/Athena/Items/Cosmetics/")) {
                      let removeuasset = item.replace(/.uasset/gi, "");
                      request(`https://fortnitecentral.genxgames.gg/api/v1/export?path=${removeuasset}&raw=true`, async function (error, response3) {
                        const data3 = JSON.parse(response3.body)['jsonOutput'][0]
                        let removeItemDefinition = data3.Type.replace(/ItemDefinition/gi, "");
                        if (data3.Name.toLowerCase().includes("random")) return;
                        let id = `${removeItemDefinition}:${data3.Name}`;
                        let variants = [];
                        
                        athena.items[id] = {
                            "templateId": id,
                            "attributes": {
                                "max_level_bonus": 0,
                                "level": 1,
                                "item_seen": true,
                                "xp": 0,
                                "variants": variants,
                                "favorite": false
                            },
                            "quantity": 1
                        }
                        
                    


                    


                        fs.writeFileSync("./profile_athena.json", JSON.stringify(athena, null, 2));


                    })


                    }
                    
                    }
                    console.log("profile athena is done!".green)
                    


            })








    })
    }else if(choice1.data === 'allcos'){
        request(`https://fortniteapi.io/v2/items/list`,{'headers': {'Authorization': apiKey}},
        async function (error, response2) {
            const data = JSON.parse(response2.body)
            if (data.error) {
                console.log(data.error.code)
            } else {
                console.log("adding all cosmetica pls wait".blue)
                for (const item of data['items']) {
                    if(item.type.id === "bundle" || item.type.id === "battlebus" || item.type.id === "bannertoken" || item.type.id === "cosmeticvariant"){
                        console.log(item)
                    }else{
                        if (item.id.toLowerCase().includes("random")) return;
                        if(item.type.id === "backpack"){
                            var  backendValue = "AthenaBackpack"
                          }else if (item.type.id === "outfit"){
                              var  backendValue = "AthenaCharacter"
                          }else if (item.type.id === "emote"){
                              var  backendValue = "AthenaDance"
                          }else if (item.type.id === "pickaxe"){
                              var  backendValue = "AthenaPickaxe"
                          }else if (item.type.id === "spray"){
                              var  backendValue = "AthenaSpray"
                          }else if (item.type.id === "loadingscreen"){
                              var  backendValue = "AthenaLoadingScreen"
                          }else if (item.type.id === "emoji"){
                              var  backendValue = "AthenaEmoji"
                          }else if (item.type.id === "glider"){
                              var  backendValue = "AthenaGlider"
                          }else if (item.type.id === "wrap"){
                            var  backendValue = "AthenaItemWrap"
                        }else if (item.type.id === "music"){
                            var backendValue = "AthenaMusicPack"
                        }else if (item.type.id === "pet"){
                            var backendValue = "AthenaPetCarrier"
                        }else if (item.type.id === "toy"){
                            var backendValue = "AthenaToy"
                        }
                      
               
                        let id = `${backendValue}:${item.id}`;
                        let variants = [];
                
                        if (item.styles) {
                            item.styles.forEach(obj => {
                                variants.push({
                                    "channel": obj.channel || "",
                                    "active": obj.tag || "",
                                    "owned": obj.map(variant => variant.tag || "")
                                })
                            })
                        }
                        athena.items[id] = {
                            "templateId": id,
                            "attributes": {
                                "max_level_bonus": 0,
                                "level": 1,
                                "item_seen": true,
                                "xp": 0,
                                "variants": variants,
                                "favorite": false
                            },
                            "quantity": 1
                        }
                        
                    }
                }
                fs.writeFileSync("./profile_athena.json", JSON.stringify(athena, null, 2));
                console.log("profile athena is done!".green)
            }













    })



    }
})();