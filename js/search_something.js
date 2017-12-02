(function(){
			const form=document.querySelector('#search-form');
			const searchField=document.querySelector('#search-keyword');
			let searchedForText;
			const responseContainer=document.querySelector('#response-container');
			form.addEventListener('submit',function(e){
				e.preventDefault();
				responseContainer.innerHTML='';
				searchedForText=searchField.value;
				const imgRequest=new XMLHttpRequest();
				imgRequest.onload=addImage;
				imgRequest.onerror=function(err){
					requestError(err,'image');
				};
				imgRequest.open('GET',`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
				imgRequest.setRequestHeader('Authorization','Client-ID 9aed72134f590468a957d29066ed6f6229b86054e81f725d760735ad26cbb120');
				imgRequest.send();
				function addArticles(){
					var data=JSON.parse(this.responseText);
					console.log(data);
					if(data.response&&data.response.docs&&data.response.docs.length>1){
						htmlContent='<ul class="article-list">'+
						data.response.docs.map(
							article=>`<li class="article">
							 <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
							 <p>
								${article.snippet}
							 </p>
							</li>`).join('')+'</ul>';
					}
					else{
						htmlContent='<div>No articles available.</div>';
					}
					responseContainer.insertAdjacentHTML('beforeend',htmlContent);
				}
				const articleRequest=new XMLHttpRequest();
				articleRequest.onload=addArticles;
				articleRequest.open('GET',`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a8366b25dc4d47f5a0f614d5eaf94f74`);
				articleRequest.send();


				function addImage(){
					let htmlContent='';
					const data=JSON.parse(this.responseText);
					console.log(data);
					if(data&&data.results&&data.results[0]){
					
								const firstImage=data.results[0];
								htmlContent=`<figure class="figure-img">
									<img src="${firstImage.urls.regular}" >
									<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
								</figure>
								`;
								responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
							
						}
					else{
						console.log('There are no messages');
					}
					}
				});


		})()