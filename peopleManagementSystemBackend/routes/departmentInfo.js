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


module.exports = router;