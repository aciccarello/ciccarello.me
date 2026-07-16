---
title: 'San Diego Sports Teams'
layout: page
back_button: ..
redirect_from: /sd-sports
sportsTeams:
  - name: San Diego FC
    url: https://sandiegofc.com/
    image: https://upload.wikimedia.org/wikipedia/en/6/6f/San_Diego_FC_logo.svg
    image_alt: Team shield of San Diego FC depicting a soccer ball.
    summary: MLS Men's Soccer team that started in 2025
  - name: Sockers Soccer
    url: http://sdsockers.com/
    image: https://upload.wikimedia.org/wikipedia/en/5/5f/San_Diego_Sockers_16_logo.png
    image_alt: Team shield of Sockers.
    summary: MASL Indoor soccer playing at Frontwave Arena in Oceanside
  - name: Gulls Hockey
    url: http://www.sandiegogulls.com/
    image: https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/San_Diego_Gulls_logo.svg/1920px-San_Diego_Gulls_logo.svg.png
    image_alt: Logo of a gull holding a hockey stick.
    summary: AHL minor league ice hockey playing at Peganga Arena. Affiliate for the Anaheim Ducks.
  - name: Strike Football
    url: http://sdstrikeforce.com/
    image: https://upload.wikimedia.org/wikipedia/en/thumb/8/88/San_Diego_Strike_Force_Logo.svg/1920px-San_Diego_Strike_Force_Logo.svg.png
    image_alt: Team logo of San Diego strike depicting a bomb-shaped football dropping from the sky.
    summary: IFL Indoor Football team playing at Frontwave Arena
  - name: Oceanside Bombers
    url: https://www.oceansidebombers.com/
    image: https://upload.wikimedia.org/wikipedia/en/2/2c/Oceanside_Bombers.png?_=20251114000344
    image_alt: Team logo of Oceanside Bombers a stealth bomber with a blue football.
    summary: Arena Football team playing at Frontwave Arena
  - name: Wild Volleyball
    url: http://sandiegowild.com/
    image: https://images.squarespace-cdn.com/content/v1/63fe6a9f4386440220ae7ea2/f72d93ee-28a6-45e9-ab60-63f32d847729/SD+Wild+Logo_Official_Cropped.png
    image_alt: Team logo of San Diego Wild depicting an aggressive bear.
    summary: NVA Men's volleyball team
  - name: Lions Football
    url: http://www.sandiegolions.com/
    image: https://upload.wikimedia.org/wikipedia/en/9/9d/San_Diego_Lions_AFL_logo.png
    image_alt: Logo for Lions depicting a lion hiking a football.
    summary: USAFL Australian football team
  - name: Surfers Rugby
    url: https://www.sdsurfersrugby.com
    image: https://upload.wikimedia.org/wikipedia/en/8/8a/San_Diego_Surfers_logo.png
    image_alt: San Diego Surfers ruby team seal
    summary: Non-profit women's rugby club operating since 1975
  - name: Armada Rugby
    url: https://www.sdarmada.com/
    image: https://static.wixstatic.com/media/544ca9_67a10b48cf824c4ab4c9893c4f20d776~mv2.png/v1/crop/x_0,y_2,w_500,h_494/fill/w_202,h_200,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20design%20(14)%20copy%204.png
    image_alt: San Diego Armada red and yellow ruby team seal
    summary: LGBTQ+ inclusive rugby team
  - name: Surf Riders Cricket
    url: https://sandiegosurfriders.com/
    image: https://upload.wikimedia.org/wikipedia/en/5/52/San_Diego_Surf_Riders_original_logo.png
    image_alt: Logo of a cricket player.
    summary: MiLC Cricket team
  - name: Atlético Tlecoyotes de San Diego
    url: https://ajupeme-usa.com/
    image: https://img1.wsimg.com/isteam/ip/7a1791f4-1883-4a79-bf5e-f3c71b7625c5/White%20Minimalist%20Aesthetic%20Thank%20You%20Circle%20St.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:730,h:730,cg:true
    image_alt: Team logo of a coyote in a flaming silhouette above the Spanish word 'Tlecoyotes'
    summary: Mesoamerican Ballgame Team
  - name: Yacht Club
    url: http://www.sdyc.org/
    image: https://upload.wikimedia.org/wikipedia/commons/4/45/Burgee_of_San_Diego_Yacht_Club.svg
    image_alt: Pennant flag with a red star.
    summary: Sailing team in America's cup
  - name: Dynast Paintball
    url: https://www.nxlpaintball.com/sandiegodynasty
    image: https://static.wixstatic.com/media/39aac2_7d24024ce06048acae2d761215675533~mv2.jpg/v1/fill/w_1920,h_289,al_c,q_85,enc_avif,quality_auto/LogoBar_SanDiegoDynasty.jpg
    image_alt: Dynasty Swoosh logo with Asian characters
    summary: NXL Professional Paintball Team
---

<style>
/* Logos don't fit the 16/9 aspect ratio */
.card__media--16-9 {
    aspect-ratio: 1 / 1;
    background-size: contain;
}

:is(.post-list, .post-suggestions) > li:first-child {
  grid-column-end: 2;
  
  & .card__media--16-9 {
    aspect-ratio: 1 / 1
  }
}
</style>

San Diego has a [troubled history of professional sports](https://en.wikipedia.org/wiki/Sports_in_San_Diego#Former_teams).
But there are some teams to watch across different sports.
I'm also excited about the basketball and indoor soccer teams playing at Oceanside's new Frontwave Arena.
Soccer in particular has multiple teams across different leagues.
My favorite sport of Ultimate frisbee has both men's and women's teams.

## Teams I've reviewed

<!-- TODO: limit to SD sports reviews (not Firebirds, not other post types) -->
{% removeindents %}
<ol class="post-list post-list--even">
    {%- for post in collections["sports teams"] reversed -%}
    {%- if post.data.type == "review" -%}
        <li>
            {% include "post-card.html" post: post %}
        </li>
    {%- endif -%}
    {%- endfor -%}
</ol>
{% endremoveindents %}

## Other Teams

{% removeindents %}
<ol class="post-list post-list--even">
    {%- for team in sportsTeams -%}
        <li>
<div class="h-entry">
	<a class="u-url card disable-link-styles" href="{{ team.url | url }}">
		{%- if team.image -%}
        <div class="card__media card__media--16-9"
            style="background-image: url('{{ team.image }}');">
        </div>
		{%- endif -%}
		<div class="card__primary">
			<div class="post-heading">
                <h3 class="p-name">{{ team.name | escape }}</h3>
			</div>
			<div class="post-body">
				<p class="post-text p-summary">{{ team.summary }}</p>
			</div>
		</div>
	</a>
</div>
        </li>
    {%- endfor -%}
</ol>
{% endremoveindents %}

## College Sports

- [SDSU Aztecs](https://goaztecs.com)
- [UC San Diego Tritons](https://ucsdtritons.com)
- [USD Toreros](https://usdtoreros.com)
- [San Diego City College Knights](https://sdcityknights.com/landing/index)
- [Cal State San Marcos Cougars](https://csusmcougars.com)
- [Point Loma Nazarene University Sea Lions](https://plnusealions.com/)
- [MiraCosta College Spartans](https://mccspartans.com/)
