let base_url = "https://swapi.dev/api/";
let next = 1;
let counter = 0;
let page_count = 0;
const planets_array = [];
let urls = [];

function all_planets(){

	let planet = new Promise((resolve, reject) => {

		fetch( base_url+'/planets' )
		.then( planets => planets.json() )
		.then( planets => {

    	for (var i = planets.results.length - 1; i >= 0; i--) {
    		if(planets.results[i].films.length > 0){
    			if(planets.results[i].residents.length > 0){
    				for (var j = planets.results[i].residents.length - 1; j >= 0; j--) {
    				fetch(planets.results[i].residents[j])
    				.then( residents => residents.json() )
    				.then( residents => {
    					if(residents.species.length > 0){
    							fetch(residents.species[0])
    							.then( species => species.json() )
    							.then( species => {
    								if(species.classification == "reptiles"){
    									planets_array.push(planets.results[i]);
    											$(".planet-card").append("<div class='p-4 w-full  bg-neutral-700 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 planet-card'>"+
												"<h5 class='mb-2 text-left text-3xl font-bold text-gray-900 dark:text-white'>"+planets.results[i].name+"</h5>"+
    											"<p class='mb-5 text-left text-base text-gray-500 sm:text-lg dark:text-gray-400'>Films</p>"+
        										"<h5 class='mb-2 text-right text-3xl font-bold text-gray-900 dark:text-white'>"+planets.results[i].created+"</h5>"+
    											"<p class='mb-5 text-right text-base text-gray-500 sm:text-lg dark:text-gray-400'>"+planets.results[i].climate+"</p></div>");
								    	// console.log(species);
								    }
								})

    						}
				    })

    			}
    		}

    	}
    }	

    page_count = planets.count/planets.results.length;
    for (var i = 2; i <= page_count; i++) {
    	urls.push(fetch(base_url+'/planets/?page='+i));
    	}

    	Promise.all(urls).then(planets_all => {
    		planets_all.forEach(p => p.json().then(p => {
    			for (var i = p.results.length - 1; i >= 0; i--) {

    			if(p.results[i].films.length > 0){
						// console.log(p.results[i]);
						if(p.results[i].residents.length > 0){
							for (var j = p.results[i].residents.length - 1; j >= 0; j--) {

								fetch(p.results[i].residents[j])
								.then( residents => residents.json() )
								.then( residents => {
									if(residents.species.length > 0){
										fetch(residents.species[0])
										.then( species => species.json() )
										.then( species => {
										    	// console.log(species.classification);
										    	if(species.classification == "reptiles"){
										    		$(".planet-card").append("<div class='p-4 w-full  bg-neutral-700 rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 planet-card'>"+
												"<h5 class='mb-2 text-left text-3xl font-bold text-gray-900 dark:text-white'>"+p.results[i].name+"</h5>"+
    											"<p class='mb-5 text-left text-base text-gray-500 sm:text-lg dark:text-gray-400'>Films</p>"+
        										"<h5 class='mb-2 text-right text-3xl font-bold text-gray-900 dark:text-white'>"+p.results[i].created+"</h5>"+
    											"<p class='mb-5 text-right text-base text-gray-500 sm:text-lg dark:text-gray-400'>"+p.results[i].climate+"</p></div>");
										    		planets_array.push(p.results[i]);
										    	}
										    })

									}
							    	// console.log(residents);

							    })

							}
						}

					}
				}

    			// console.log(p);
    		}))

    	}).catch()

    	resolve(planets_array);
    } );
	});
	planet.then((data) => {
		    		console.log(data);
}).catch((error) => {

});


}


all_planets();



