---
title: 'San Diego Sports Teams'
layout: page
back_button: ..
sportsTeams:
  - name: Padres Baseball
    url: https://www.mlb.com/padres
    image: https://upload.wikimedia.org/wikipedia/commons/5/5d/San_Diego_Padres_wordmark_logo_2020.svg
    image_alt: Padres team logo
    summary: MLB Baseball Team playing at Petco Park downtown. San Diego's biggest sports team.
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
  - name: Growlers Ultimate
    url: http://watchufa.com/growlers
    image: https://upload.wikimedia.org/wikipedia/en/c/cc/San_Diego_Growlers_%28ultimate_team%29_logo.png
    image_alt: Logo of a wolf
    summary: UFA Ultimate Frisbee team playing at Mission Bay High School
  - name: Seals Lacrosse
    url: https://sealslax.com/
    image: https://upload.wikimedia.org/wikipedia/en/2/21/San_Diego_Seals_primary_logo.png
    image_alt: Seals team logo of an aggressive seal face with a crown.
    summary: NLL Box lacrosse (indoor) team playing at Pechanga Arena
  - name: California Redwoods Lacrosse
    url: https://www.premierlacrosseleague.com/redwoods
    image: https://upload.wikimedia.org/wikipedia/en/d/db/California_Redwoods_lacrosse.jpg
    image_alt: California Redwoods logo depicting a bear head on a seal.
    summary: PLL Field lacrosse (outdoor)
  - name: Clippers Baskeball
    url: https://sandiego.gleague.nba.com/
    image: https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/San_Diego_Clippers_%28NBA_G_League%29_Logo.svg/1920px-San_Diego_Clippers_%28NBA_G_League%29_Logo.svg.png
    image_alt: Round logo of Clippers basketball.
    summary: G League basketball team playing at Frontwave Arena in Oceanside. Affiliated with the LA Clippers of the NBA. Moved from Ontario in 2024.
  - name: Strike Football
    url: http://sdstrikeforce.com/
    image: https://upload.wikimedia.org/wikipedia/en/thumb/8/88/San_Diego_Strike_Force_Logo.svg/1920px-San_Diego_Strike_Force_Logo.svg.png
    image_alt: Team logo of San Diego strike depicting a bomb-shaped football dropping from the sky.
    summary: IFL Indoor Football team playing at Frontwave Arena
  - name: Mojo Volleyball
    url: http://sandiegomojovb.com/
    image: https://upload.wikimedia.org/wikipedia/en/0/07/SanDiegoMojo.png
    image_alt: Team logo of San Diego Mojo depicting an eagle head.
    summary: PVF Women's Volleyball playing at Viejas Arena
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
  - name: Surf Riders Cricket
    url: https://sandiegosurfriders.com/
    image: https://upload.wikimedia.org/wikipedia/en/5/52/San_Diego_Surf_Riders_original_logo.png
    image_alt: Logo of a cricket player.
    summary: MiLC Cricket team
  - name: Albion Soccer
    url: https://albionsandiego.com/
    image: https://upload.wikimedia.org/wikipedia/en/2/22/Albionscproslogo.png
    image_alt: Team shield of Albion with three stars.
    summary: NISA 3rd tier soccer team
  - name: Yacht Club
    url: http://www.sdyc.org/
    image: https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Burgee_of_San_Diego_Yacht_Club.svg/2560px-Burgee_of_San_Diego_Yacht_Club.svg.png
    image_alt: Pennant flag with a red star.
    summary: Sailing team in America's cup
---

<style>
/* Logos don't fit the 16/9 aspect ratio */
.card__media--16-9 {
    aspect-ratio: 1 / 1;
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
<ol class="post-list">
    {%- for post in collections["sports teams"] -%}
        <li>
            {% include "post-card.html" post: post %}
        </li>
    {%- endfor -%}
</ol>
{% endremoveindents %}

## Other Teams

<ol class="post-list">
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
                <h3 class="h2 p-name">{{ team.name | escape }}</h3>
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

## College Sports

- [SDSU Aztecs](https://goaztecs.com)
- [UC San Diego Tritons](https://ucsdtritons.com)
- [USD Toreros](https://usdtoreros.com)
- [San Diego City College Knights](https://sdcityknights.com/landing/index)
- [Cal State San Marcos Cougars](https://csusmcougars.com)
- [Point Loma Nazarene University Sea Lions](https://plnusealions.com/)
- [MiraCosta College Spartans](https://mccspartans.com/)
