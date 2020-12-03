const express = require('express');
const router = express.Router();

const DepartmentInfo = require('../models/DepartmentInfo');

// GET BACK ALL THE POSTS
router.get('/', async (req,res) => {
    try{
        const departmentInfo = await DepartmentInfo.find();
        res.json(departmentInfo); 
    }catch(err) {
        res.json({message: err});
    }
});

router.put('/', async (req, res) => {

    try {

        for(let i of req.body){
            const updateDepartment = await DepartmentInfo.findOneAndUpdate(
                {_id : i._id}, 
                { $set: i}
                );
        }

        res.json({message: "DATA UPDATED SUCCESSFULLY"});
    }catch(err) {
        res.json({message: err});
    }

});

module.exports = router;