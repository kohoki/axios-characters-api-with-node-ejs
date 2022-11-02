const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    //console.log("XXXXXXX", req.params.id)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

/* GET create page */
 router.get("/new", (req, res) => {
     res.render('characters/create-character')
   })

router.post('/new',async (req, res) => {
    console.log(req.body)
    try
    {
    await axios({
        method: 'post',
        url: 'https://ih-crud-api.herokuapp.com/characters/',
        data: {
            name: req.body.name,
            occupation: req.body.occupation,
            weapon:  req.body.weapon,
            dept: req.body.dept
        }    
        });

        const responseFromAPI = await axios.get("https://ih-crud-api.herokuapp.com/characters")
        
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    }
    catch(error)
    {console.log("error")}
  })



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters