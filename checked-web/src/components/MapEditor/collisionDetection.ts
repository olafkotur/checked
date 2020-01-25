function checkCollision(zones: any) {

    for (let i = 0; i < zones.length; i++) {
        const thisZone = zones[i];
        const thisRect = thisZone.getBoundingClientRect();
        for (let j = 0; j < zones.length; j++) {
            if (thisZone !== zones[j]) {
                const otherZone = zones[j];
                const otherRect = otherZone.getBoundingClientRect();

                let xBool = false;
                let yBool = false;

                // general detection
                if ((otherRect.right > thisRect.left && otherRect.right <= thisRect.right) || (otherRect.left < thisRect.right && otherRect.left >= thisRect.left)) {
                    // console.log("Y - Intersect");
                    yBool = true;
                }

                if ((otherRect.top >= thisRect.top && otherRect.top < thisRect.bottom) || (otherRect.bottom > thisRect.top && otherRect.bottom <= thisRect.bottom)) {
                    xBool = true;
                    // console.log("X - Intersect");
                }

                if (yBool === false) { // only run if the first check fails
                    // different size accomidation
                    if ((otherRect.left < thisRect.left) && (otherRect.right > thisRect.left)) {
                        // console.log("Small Left Y - Intersect");
                        yBool = true;
                    }
                }


                if (xBool === false) { // only run if the first check fails
                    // different size accomidation
                    if ((otherRect.top < thisRect.top) && (otherRect.bottom > thisRect.top)) {
                        // console.log("Small Top X - Intersect");
                        xBool = true;
                    }
                }

                if (xBool === true && yBool === true) {
                    //alert("colision detected")
                    return true;
                }


            }
        }
    }

    return false
}

export default checkCollision;