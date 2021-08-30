/* EDIT THIS IF YOU PLAN ON MAKING A BORDER WITH YOUR OWN HTML/CSS */
function handlePlayer(data, plr)
{
    if (!data.waiting) {
        charId = data[`p${plr}char`].toString().padStart(2, "0");
        //Sets character sidebars when game goes to chara intros
        if(data["gamemode"] == 1){
            $(`#p${plr}side`).css("background-image",
                `url("assets/sidebar/apm_com_${charId}_${plr}p_${data[`p${plr}moon`]}.bmp")`);
        }else{
            $(`#p${plr}side`).css("background-image",
                `url("assets/sidebar/apm_com_default_${plr}p.bmp")`);
        }
    } else {

        $(`#p${plr}side`).css("background-image",
                `url("assets/sidebar/apm_com_default_${plr}p.bmp")`);
    }
}


/* LEAVE THESE ALONE IF YOU DON'T KNOW WHAT YOU'RE DOING */
clockActive = false;
pulling = false;

function clockTick()
{
    if (!pulling) {
        // Pull from the API
        pulling = true;
        axios.get("/state")
        .then(res => {
            handlePlayer(res.data, "1");
            handlePlayer(res.data, "2");
        })
        .catch(err => {
            console.log(err);
        })
        .then(() => {
            // Allow the clock to pull again
            pulling = false;
        });
    }
    
    if (clockActive) {
        window.requestAnimationFrame(clockTick);
    }
}

function startClock()
{
    if (!clockActive) {
        clockActive = true;
        window.requestAnimationFrame(clockTick);
    }
}

function stopClock()
{
    clockActive = false;
}
