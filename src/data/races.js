const races = [
    {
        cn_name:"矮人", 
        en_name: 'dwarf',
        extra: {
            con: 2
        },
        sub:[{
            cn_name: '丘陵矮人',
            en_name: 'hill_dwarf',
            extra: {
                wis: 1,
                hp:1
            } 
        },{
            cn_name: '丘陵矮人',
            en_name: 'mountain_dwarf',
            extra: {
                str: 2,
            }         
        }]
    },{
        cn_name:"精灵", 
        en_name: 'elf',
        extra: {
            dex: 2
        },
        sub:[{
            cn_name: '高等精灵',
            en_name: 'high_elf',
            extra: {
                int:1
            } 
        },{
            cn_name: '木精灵',
            en_name: 'wood_elf',
            extra: {
                wis: 1,
            }         
        },{
            cn_name: '黑暗精灵',
            en_name: 'dark_elf',
            extra: {
                cha: 1,
            }         
        }]
    },{
        cn_name:"半身人", 
        en_name: 'halfling',
        extra: {
            dex: 2
        },
        sub:[{
            cn_name: '轻足半身人',
            en_name: 'lightfoot',
            extra: {
                cha:1
            } 
        },{
            cn_name: '敦实半身人',
            en_name: 'stout',
            extra: {
                con: 1,
            }         
        }]
    },{
        cn_name:"人类", 
        en_name: 'human',
        sub:[{
            cn_name: '标准人类',
            en_name: 'standard',
            extra: {
                str:1,
                dex:1,
                con:1,
                wis:1,
                int:1,
                cha:1
            } 
        },{
            cn_name: '变体人类',
            en_name: 'variant',
            extra: {
                free: 2,
            }         
        }]
    },{
        cn_name:"龙裔", 
        en_name: 'dragonborn',
        extra: {
            str:2,
            cha:1
        }
    },{
        cn_name:"侏儒", 
        en_name: 'gnome',
        extra: {
            int: 2
        },
        sub:[{
            cn_name: '地底侏儒',
            en_name: 'deep_gnomes',
        },{
            cn_name: '森林侏儒',
            en_name: 'forest_gnome',
            extra: {
                dex: 1,
            }         
        },{
            cn_name: '岩侏儒',
            en_name: 'rock_gnome',
            extra: {
                con: 1,
            }         
        }]
    },{
        cn_name:"半精灵", 
        en_name: 'half_elf',
        extra: {
            free:2,
            cha:2
        }
    },{
        cn_name:"半兽人", 
        en_name: 'half_orc',
        extra: {
            str:2,
            con:1
        }
    },{
        cn_name:"提夫林", 
        en_name: 'tiefling',
        extra: {
            cha:2,
            int:1
        }
    }
];

export  {
    races
}