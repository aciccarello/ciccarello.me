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
    summary: MLS Men's Soccer team coming 2025
  - name: Sockers Soccer
    url: http://sdsockers.com/
    image: https://upload.wikimedia.org/wikipedia/en/5/5f/San_Diego_Sockers_16_logo.png
    image_alt: Team shield of Sockers.
    summary: MASL Indoor soccer playing at Frontwave Arena in Oceanside
  - name: Growlers Ultimate
    url: http://watchufa.com/growlers
    image: https://upload.wikimedia.org/wikipedia/en/c/cc/San_Diego_Growlers_%28ultimate_team%29_logo.png
    image_alt: Logo of a wolf
    summary: UFA Ultimate Frisbee team playing at Mission Bay High School
  - name: Super Bloom Ultimate
    url: https://sandiegosuperbloom.com/
    image: https://images.squarespace-cdn.com/content/v1/5c9d318b755be24741183f25/1578871371679-O3P4C9KRFTCJ4LJ7XFSF/superbloom-09.png?format=750w
    image_alt: San Diego Super Bloom logo depicting California Poppies.
    summary: WUL Women's Ultimate Team playing at Kearny High School
  - name: Seals Lacrosse
    url: https://sealslax.com/
    image: https://upload.wikimedia.org/wikipedia/en/3/38/SD_Seals.PNG
    image_alt: Seals team logo of an aggressive seal face with a crown.
    summary: NLL Box lacrosse (indoor) team playing at Pechanga Arena
  - name: California Redwoods Lacrosse
    url: https://www.premierlacrosseleague.com/redwoods
    image: https://upload.wikimedia.org/wikipedia/en/d/db/California_Redwoods_lacrosse.jpg
    image_alt: California Redwoods logo depicting a bear head on a seal.
    summary: PLL Field lacrosse (outdoor)
  - name: Legion Rugby
    url: https://www.sdlegion.com/
    image: https://upload.wikimedia.org/wikipedia/commons/7/7e/San_diego_legion_logo.png
    image_alt: San Diego Legion team seal.
    summary: MLR Rugby team playing at Snapdragon Stadium
  - name: Gulls Hockey
    url: http://www.sandiegogulls.com/
    image: https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/San_Diego_Gulls_logo.svg/1920px-San_Diego_Gulls_logo.svg.png
    image_alt: Logo of a gull holding a hockey stick.
    summary: AHL minor league ice hockey playing at Peganga Arena. Affiliate for the Anaheim Ducks.
  - name: Clippers Baskeball
    url: https://ontario.gleague.nba.com/
    image: https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Ontario_Clippers_logo.svg/1920px-Ontario_Clippers_logo.svg.png
    image_alt: Round logo of Clippers basketball.
    summary: G League basketball team playing at Fontwave Arena affiliated with the LA Clippers. Moved from Ontario in 2024.
  - name: Strike Football
    url: http://sdstrikeforce.com/
    image: https://upload.wikimedia.org/wikipedia/en/thumb/8/88/San_Diego_Strike_Force_Logo.svg/1920px-San_Diego_Strike_Force_Logo.svg.png
    image_alt: Team logo of San Diego strike depicting a bomb-shaped football dropping from the sky.
    summary: IFL Indoor Football team playing at Pechanga Arena
  - name: Mojo Volleyball
    url: http://sandiegomojovb.com/
    image: https://upload.wikimedia.org/wikipedia/en/0/07/SanDiegoMojo.png
    image_alt: Team logo of San Diego Mojo depicting an eagle head.
    summary: PVF Women's Volleyball playing at Viejas Arena
  - name: Wild Volleyball
    url: http://sandiegowild.com/
    image: https://upload.wikimedia.org/wikipedia/en/5/54/San_Diego_Wild_logo.png
    image_alt: Team logo of San Diego Wild depicting an aggressive bear.
    summary: NVA Men's volleyball team
  - name: Lions Football
    url: http://www.sandiegolions.com/
    image: https://upload.wikimedia.org/wikipedia/en/9/9d/San_Diego_Lions_AFL_logo.png
    image_alt: Logo for Lions depicting a lion hiking a football.
    summary: USAFL Australian football team
  - name: Yacht Club
    url: http://www.sdyc.org/
    image: https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Burgee_of_San_Diego_Yacht_Club.svg/2560px-Burgee_of_San_Diego_Yacht_Club.svg.png
    image_alt: Pennant flag with a red star.
    summary: Sailing team in America's cup
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
