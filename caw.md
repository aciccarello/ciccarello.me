---
title: 'Caw: Crow or No?'
slug: caw
layout: page
back_button: /birds/
image:
quizData:
  - id: color
    prompt: What color was it?
    options:
      - id: black
        title: All black
        hint: No other colors seen
        reason: Mature crows and ravens are normally all black
        score:
          crow: 2
          raven: 2
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/387481431/embed
      - id: other-color
        title: Has some white or other color
        hint: Look at the feathers of the head, wing, belly, or tail plus bill, legs, and exposed skin
        reason: Color or lighter patches usually mean it is not a crow
        score:
          crow: 0
          raven: 0
          neither: 5
        media:
          src: https://macaulaylibrary.org/asset/341809521/embed
  - id: size
    prompt: How big is it?
    options:
      - id: small
        title: 'Small'
        hint: Robin sized or smaller
        reason: Starlings, blackbirds, and grackles are all much smaller than crows and ravens.
        score:
          crow: 0
          raven: 0
          neither: 3
        media:
          src: https://macaulaylibrary.org/asset/576149141/embed
          caption: Can it perch on a bird feeder?
      - id: medium
        title: 'Medium'
        hint: Larger than a robin but smaller than a medium-sized hawk
        reason: Crows are larger than most songbirds, but not compared to most raptors
        score:
          crow: 2
          raven: 0
          neither: 1
        media:
          src: https://macaulaylibrary.org/asset/55659461/embed
          caption: Compare to a red-tailed hawk
      - id: large
        title: 'Large'
        hint: Hawk sized, very bulky
        reason: Ravens are as big as a large hawk.
        score:
          crow: 0
          raven: 3
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/627977316/embed
          caption: Canada Geese are no lightweights
      - id: xlarge
        title: 'Extra-Large'
        hint: Larger than a hawk, large wings
        reason: Turkey Vultures and even the smaller Black Vulture are larger than ravens, look for their extra-large wings with white or gray patches
        score:
          crow: 0
          raven: 0
          neither: 3
        media:
          src: https://macaulaylibrary.org/asset/216584601/embed
  - id: tail
    prompt: What tail shape did you notice in flight?
    options:
      - id: crow-tail
        title: Squared or even fan tail
        hint: Outer and inner tail feathers look closer in length.
        reason: A crow's tail feathers are usually about the same length.
        score:
          crow: 1
          raven: 0
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/613817287/embed
      - id: raven-tail
        title: Wedge or diamond-like tail
        hint: Center feathers appear longer.
        reason: A raven's tail has longer feathers in the middle
        score:
          crow: 0
          raven: 2
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/142607851/embed
      - id: long-tail
        title: Extra-long
        hint: Tail is longer than half the body
        reason: A few species of grackles have noticeably long tails
        score:
          crow: 0
          raven: 0
          neither: 2
        media:
          src: https://macaulaylibrary.org/asset/617940417/embed
  - id: bill
    prompt: What does the bill look like?
    options:
      - id: raven-bill
        title: Heavy bill with a deep, chunky base
        hint: Looks more powerful even at distance.
        reason: Common Ravens have a thick bill that stays chunky nearly to the tip.
        score:
          crow: 0
          raven: 3
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/617460175/embed
      - id: crow-bill
        title: Thick bill but tapers clearly to a point
        hint: Black bill is still prominent but doesn't look heavy
        reason: If the bill is thick but tapers, it may be a crow
        score:
          crow: 3
          raven: 1
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/286868001/embed
      - id: neither-bill
        title: Thin, sharp, or brightly colored bill
        hint:
        reason: Thin bills usually mean it is not a crow or raven
        score:
          crow: 0
          raven: 0
          neither: 3
        media:
          src: https://macaulaylibrary.org/asset/57760971/embed
  - id: bristles
    prompt: Does it have a mustache?
    options:
      - id: raven-stash
        title: Yes, with long bristles
        hint: Does it look like long feathers are flush against as much of 2/3rds of the bill?
        reason: The bristles on a raven are longer and often more noticeable
        score:
          crow: 1
          raven: 3
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/383039781/embed
      - id: crow-stash
        title: Yes, with short bristles
        hint: Look at the top of the bill for some extra feathers but less than 1/2 the length of the bill
        reason: Crows do have bill bristles, but they never extend more than halfway.
        score:
          crow: 3
          raven: 1
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/27327221/embed
      - id: clean-shave
        title: No bristles above the bill
        hint: Clean bill...of feathers?
        reason: Both crows and ravens have some bristles
        score:
          crow: 0
          raven: 0
          neither: 3
        media:
          src: https://macaulaylibrary.org/asset/530154711/embed
  - id: eyes
    prompt: What color are the eyes?
    options:
      - id: eyes-black
        title: Completely black
        hint: Iris is extremely hard to see
        reason: Crows and ravens all have black eyes except when very young (when they will be blue)
        score:
          crow: 1
          raven: 1
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/635611806/embed
      - id: eyes-color
        title: White or colored
        hint: Iris will usually stand out against light colored eyes
        reason: Many blackbirds and cormorants have white or colored eyes
        score:
          crow: 0
          raven: 0
          neither: 3
        media:
          src: https://macaulaylibrary.org/asset/107295441/embed
  - id: beard
    prompt: Does it have a beard?
    options:
      - id: raven-beard
        title: Yes!
        hint: More visible when calling
        reason: Ravens have some scruff
        score:
          crow: 0
          raven: 3
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/392903841/embed
          caption:
      - id: no-beard
        title: No!
        hint: No individual feathers visible
        reason: Most birds have relatively smooth throats
        score:
          crow: 1
          raven: 0
          neither: 1
        media:
          src: https://macaulaylibrary.org/asset/72167041/embed
          caption:
      - id: long-neck
        title: Where do I look? The neck is long?
        hint: Does a thin neck clearly separate the body and head?
        reason: Cormorants are longer than corvids
        score:
          crow: 0
          raven: 0
          neither: 5
        media:
          src: https://macaulaylibrary.org/asset/109443061/embed
          caption:
  - id: voice
    prompt: What did it sound like?
    options:
      - id: raven-voice
        title: Deeper croak or rough grumble
        hint: Lower and throaty
        reason: Ravens are known for their croak
        score:
          crow: 0
          raven: 4
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/453042221/embed
          isVideo: true
      - id: crow-voice
        title: Higher, classic caw
        hint: Sharp and familiar crow calls.
        reason: A classic caw call usually means American Crow.
        score:
          crow: 3
          raven: 0
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/472843/embed
          isVideo: true
      - id: neither-voice
        title: Clicks
        hint:
        reason: Both crows and ravens can make a wide variety of noises and frequently make clicking sounds.
        score:
          crow: 1
          raven: 1
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/626606942/embed
          isVideo: true
      - id: neither-voice
        title: Squeaky, melodic, metallic, or mixed mimic sounds
        hint:
        reason: More common for starlings, blackbirds, or other species, but corvids do have a range of sounds.
        score:
          crow: 0
          raven: 0
          neither: 1
        media:
          src: https://macaulaylibrary.org/asset/482897/embed
          isVideo: true
  - id: flight
    prompt: How did it move in the air?
    options:
      - id: fast-flight
        title: Rapid and/or shallow wingbeats
        hint: Does the bird look like it's in a hurry?
        reason: Both blackbirds and cormorants will flap more rapidly than a crow or raven.
        score:
          crow: 0
          raven: 0
          neither: 1
        media:
          src: https://macaulaylibrary.org/asset/358397021/embed
          isVideo: true
      - id: calm-flight
        title: Steady flapping or short glides
        hint: Bird looks relaxed but active
        reason: Crows are efficient fliers and less worried about predators swooping in
        score:
          crow: 1
          raven: 1
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/407693/embed
          isVideo: true
      - id: thermal-flight
        title: Hanging out
        hint: Uses thermals like a vulture
        reason: Ravens, like vultures and hawks, use thermals (rising hot air) so they can fly without flapping
        score:
          crow: 0
          raven: 2
          neither: 1
        media:
          src: https://macaulaylibrary.org/asset/312273601/embed
          isVideo: true
  - id: group
    prompt: How many birds did you observe?
    options:
      - id: raven-group
        title: Single bird or pair
        hint: Was this bird all alone or only with a partner?
        reason: Ravens don't usually congregate unless there is lots of food
        score:
          crow: 0
          raven: 1
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/646005119/embed
      - id: crow-group
        title: Small group
        hint: Was there a small flock or group of 3-30 birds?
        reason: Crows and blackbirds tend to be more social than ravens
        score:
          crow: 1
          raven: 0
          neither: 1
        media:
          src: https://macaulaylibrary.org/asset/629064538/embed
      - id: neither-group
        title: Large flock
        hint: Are there more than 30 individuals?
        reason: Crows often form large flocks in the winter. Members of the blackbird family are also known for large flocks.
        score:
          crow: 3
          raven: 0
          neither: 3
        media:
          src: https://macaulaylibrary.org/asset/646943447/embed
  - id: behavior
    prompt: Did you notice any of these behaviors?
    options:
      - id: crow-mobbing
        title: Multiple birds mobbing a large bird like a hawk
        hint: Birds ganging up on a potential threat
        reason: Mobbing is a classic crow behavior, though some blackbirds will also mob aggressively
        score:
          crow: 3
          raven: 0
          neither: 1
        media:
          src: https://macaulaylibrary.org/asset/515052421/embed
          caption: Birds pursuing a red-tailed hawk
      - id: swimming
        title: Swimming?
        hint: Was the bird fully in the water?
        reason: Cormorants spend hours each day in the water fishing.
        score:
          crow: 0
          raven: 0
          neither: 5
        media:
          src: https://macaulaylibrary.org/asset/612751428/embed
      - id: barrel-roll
        title: Barrel rolls or flying upside down?
        hint: Did it look like a stunt aviator having a good time?
        reason: Ravens are both playful and very aerobatic
        score:
          crow: 0
          raven: 0
          neither: 5
        media:
          src: https://macaulaylibrary.org/asset/220946301/embed
  - id: feathers
    prompt: 'Expert: How many "finger feathers" does it have (excluding the "thumb")'
    options:
      - id: raven-feathers
        title: Four
        hint: Might need a photo to count them
        reason:
        score:
          crow: 0
          raven: 1
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/295772111/embed
      - id: crow-feathers
        title: Five
        hint: Might need a photo to count them
        reason:
        score:
          crow: 1
          raven: 0
          neither: 0
        media:
          src: https://macaulaylibrary.org/asset/613817287/embed
---

<style type="text/css">
  :root {
    --color-base-hue: 540;
    --caw-quiz-crow: #2b6cb0;
    --caw-quiz-raven: #5a3fa3;
    --caw-quiz-neither: #2f855a;
    --caw-quiz-accent: var(--color-base, green);
    --caw-quiz-border: color-mix(in srgb, var(--color-border) 78%, #000000);
  }

  .caw-quiz {
    margin: 2rem 0;
  }

  .caw-quiz__status {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    align-items: center;
    margin-top: 1rem;
  }

  .caw-quiz__chips,
  .caw-quiz__point-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
  }

  .caw-quiz__chips > li,
  .caw-quiz__point-badges > li {
    list-style: none;
  }

  .caw-quiz__chip,
  .caw-quiz__point-badge {
    border-radius: 999px;
    display: inline-flex;
    gap: 0.35rem;
    border: 0.0625rem solid transparent;
    background: color-mix(in srgb, #ffffff 84%, var(--color-secondary-bg));
  }

  .caw-quiz__chip {
    font-size: 0.9rem;
    padding: 0.25rem 0.65rem;
    border-width: 0.125rem;
  }

  .caw-quiz__point-badge {
    padding: 0.2rem 0.5rem;
    font-weight: 600;
  }

  .caw-quiz__chip[data-team="crow"],
  .caw-quiz__point-badge[data-team="crow"],
  .caw-quiz__result[data-team="crow"] {
    border-color: color-mix(in srgb, var(--caw-quiz-crow) 55%, #ffffff);
  }

  .caw-quiz__chip[data-team="raven"],
  .caw-quiz__point-badge[data-team="raven"],
  .caw-quiz__result[data-team="raven"] {
    border-color: color-mix(in srgb, var(--caw-quiz-raven) 55%, #ffffff);
  }

  .caw-quiz__chip[data-team="neither"],
  .caw-quiz__point-badge[data-team="neither"],
  .caw-quiz__result[data-team="neither"] {
    border-color: color-mix(in srgb, var(--caw-quiz-neither) 55%, #ffffff);
  }

  .caw-quiz__question {
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    margin: 0;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: var(--color-secondary-bg);
    width: 100%;
    max-width: 100%;
    min-width: 18rem;
    min-inline-size: 0;
  }

  .caw-quiz__question legend {
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0 0.25rem;
  }

  .caw-quiz__options {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: clamp(18rem, 55vw, 25rem);
    grid-template-rows: auto auto 1fr;
    column-gap: 0.75rem;
    row-gap: 0.5rem;
    margin-top: 0.65rem;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }

  .caw-quiz__option {
    grid-row: 1 / -1;
    display: grid;
    grid-template-rows: subgrid;
    min-width: 0;
    scroll-snap-align: start;
    border: 0.125rem solid transparent;
    border-radius: calc(var(--border-radius) * 1.25);
    padding: 0.75rem;
    color: black;
    background:
      linear-gradient(#ffffff, #fbfbfb) padding-box,
      linear-gradient(155deg, #d9d9d9, #f4f4f4 45%, #cfcfcf) border-box;
    box-shadow:
      inset 0 0 0 0.0625rem color-mix(in srgb, var(--caw-quiz-border) 40%, var(--color-background, #ffffff)),
      0 0.25rem 0.75rem color-mix(in srgb, #000000 8%, transparent);
    position: relative;
    transition: opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .caw-quiz__option label {
    display: grid;
    grid-row: 1 / -1;
    grid-template-rows: subgrid;
    cursor: pointer;
    width: 100%;
  }

  .caw-quiz__option-header {
    display: grid;
    gap: 0.4rem;
    grid-template-columns: auto 1fr;
    align-items: start;
  }

  .caw-quiz__option input {
    margin-top: 0.18rem;
    accent-color: var(--caw-quiz-accent);
  }

  .caw-quiz__unclear-graphic {
    align-items: center;
    display: flex;
    font-size: clamp(3rem, 8vw, 5rem);
    justify-content: center;
    flex: 1 1 auto;
    line-height: 1;
    margin: 0.5rem 0;
    min-height: 6rem;
  }

  .caw-quiz__option--unclear .caw-quiz__unclear-graphic {
    align-self: stretch;
  }

  .caw-quiz__option label strong {
    display: block;
    margin-bottom: 0.15rem;
    font-size: 1.75rem;
    font-weight: normal;
  }

  .caw-quiz__hint {
    margin: 0;
    font-size: 0.95rem;
    opacity: 0.92;
  }

  .caw-quiz__option:has(input:checked) {
    border-color: var(--caw-quiz-accent);
    border-width: 0.1875rem;
    background:
      linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(155deg, var(--caw-quiz-accent), color-mix(in srgb, var(--caw-quiz-accent) 20%, #ffffff)) border-box;
    color: #000000;
    box-shadow:
      inset 0 0 0 0.0625rem color-mix(in srgb, var(--caw-quiz-accent) 25%, var(--color-background, #ffffff)),
      0 0 0 0.125rem color-mix(in srgb, var(--caw-quiz-accent) 22%, var(--color-background, #ffffff)),
      var(--box-shadow-standard);
    transform: translateY(-0.1rem);
  }

  .caw-quiz__option:has(input:focus-visible) {
    outline: 0.2rem solid color-mix(in srgb, var(--caw-quiz-accent) 30%, #ffffff);
    outline-offset: 0.08rem;
  }

  .caw-quiz__media {
    padding-top: 0.5rem;
  }

  .caw-quiz__media-frame {
    width: 100%;
    max-width: 32rem;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: calc(var(--border-radius) * 0.75);
    background: #fff;
  }

  iframe {
    background: #fff;
    width: 100%;
    border: 0;
    display: block;
  }

  .caw-quiz__media iframe {
    height: 100%;
    pointer-events: none;
  }

  .caw-quiz__media[data-media-video="true"] iframe,
  .caw-quiz__question:has(input:checked) .caw-quiz__media iframe {
    pointer-events: auto;
  }

  .caw-quiz__media figcaption {
    font-size: 0.86rem;
    margin-top: 0.4rem;
  }

  .caw-quiz__points {
    display: none;
    grid-row: 3;
    margin: 0;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 0.0625rem dashed color-mix(in srgb, var(--caw-quiz-border) 65%, #ffffff);
    font-size: 0.82rem;
  }

  .caw-quiz__result {
    border: 0.125rem solid var(--caw-quiz-border);
    border-radius: var(--border-radius);
    margin-top: 1rem;
    padding: 0.9rem;
    background: color-mix(in srgb, #ffffff 85%, var(--color-secondary-bg));
  }

  .caw-quiz__result[data-team="tie"] {
    border-color: color-mix(in srgb, var(--caw-quiz-accent) 35%, #ffffff);
  }

  .caw-quiz__result h3 {
    margin-top: 0;
    margin-bottom: 0.4rem;
    font-size: 2rem;
  }

  .caw-quiz__question:has(input:checked) {
    .caw-quiz__option label {
        opacity: 0.75;
        filter: saturate(0.6);
    }

    .caw-quiz__option label:has(input:checked) {
        opacity: 1;
        filter: none;
    }

    .caw-quiz__media-frame {
        aspect-ratio: auto;
        height: min(25rem, 72vh);
        overflow: auto;
    }

    .caw-quiz__points {
        display: block;
     }
  }

  .caw-quiz__footer {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  @media screen and (max-width: 32em) {
    .caw-quiz__options {
      grid-auto-columns: min(86vw, 20rem);
    }
  }
</style>

Whenever I see a large, all-black bird, it's time for a classic birding game: Crow or No?
I first saw [Kaeli Swift, Ph.D.](https://corvidresearch.blog/) (aka [@corvidresearch](https://www.instagram.com/corvidresearch/)) hosting this game online and giving great tips on how to ID different black birds.
Identifying these birds is a surprisingly hard challenge.
Early on in my birding journey I was corrected by an eBird reviewer on a [photo I thought was a crow](https://macaulaylibrary.org/asset/198269661) but was actually a raven.

With time it becomes easier to distinguish these birds.
Here are some tips to help you figure out if it is a crow or one of its relatives.
I'm focusing on birds in the United States, so these tips may not work for species in other regions.
Some identifiers, like body proportions, can be hard to describe but you'll learn with repetition.
One go-to feature may not be clear enough especially because age, molting patterns, and genetic mutation can cause some surprising variation.
So it is helpful to combine multiple distinguishing features when making an ID.

## Crow or No? Identify your local black bird

{% removeindents %}

<section class="caw-quiz" data-caw-quiz>
  <p>Pick one card for each question and this page will score how likely your bird is a crow, raven, or neither. Each card includes reference media from the Macaulay Library to help guide you.</p>

  <form data-caw-form>
      <div data-caw-questions>
        {% for question in quizData %}
          <fieldset class="caw-quiz__question" data-question-id="{{ question.id }}">
            <legend>{{ forloop.index }}. {{ question.prompt }}</legend>
            <div class="caw-quiz__options">
              {% for option in question.options %}
                <article class="caw-quiz__option">
                  <label>
                    <span class="caw-quiz__option-header">
                      <input
                        type="radio"
                        name="{{ question.id }}"
                        value="{{ option.id }}"
                        data-score-crow="{{ option.score.crow }}"
                        data-score-raven="{{ option.score.raven }}"
                        data-score-neither="{{ option.score.neither }}"
                        data-reason="{{ option.reason | escape }}"
                        required
                      >
                      <span>
                        <strong>{{ option.title }}</strong>
                        <p class="caw-quiz__hint">{{ option.hint }}</p>
                      </span>
                    </span>
                    {% if option.media %}
                      <figure class="caw-quiz__media" data-media-panel data-media-video="{{ option.media.isVideo | default: false }}">
                        <div class="caw-quiz__media-frame">
                          <iframe
                            src="{{ option.media.src }}"
                            loading="lazy"
                            referrerpolicy="no-referrer"
                            scrolling="no"
                            allowfullscreen
                            title="{{ option.title | escape }} reference"
                          ></iframe>
                        </div>
                        {% assign mediaCaption = option.media.caption %}
                        {% if mediaCaption != blank %}
                          <figcaption>{{ mediaCaption }}</figcaption>
                        {% elsif option.media.isVideo %}
                          <figcaption>Click to play video</figcaption>
                        {% endif %}
                      </figure>
                    {% endif %}
                    <div class="caw-quiz__points" aria-live="polite">
                      <p>{{ option.reason }}</p>
                      <ul class="caw-quiz__point-badges" aria-label="Points added by this choice">
                        {% if option.score.crow > 0 %}
                          <li><span class="caw-quiz__point-badge" data-team="crow">Crow +{{ option.score.crow }}</span></li>
                        {% endif %}
                        {% if option.score.raven > 0 %}
                          <li><span class="caw-quiz__point-badge" data-team="raven">Raven +{{ option.score.raven }}</span></li>
                        {% endif %}
                        {% if option.score.neither > 0 %}
                          <li><span class="caw-quiz__point-badge" data-team="neither">Neither +{{ option.score.neither }}</span></li>
                        {% endif %}
                        {% if option.score.crow == 0 and option.score.raven == 0 and option.score.neither == 0 %}
                          <li><span class="caw-quiz__point-badge">No points added</span></li>
                        {% endif %}
                      </ul>
                    </div>
                  </label>
                </article>
              {% endfor %}
                <article class="caw-quiz__option caw-quiz__option--unclear">
                  <label>
                    <span class="caw-quiz__option-header">
                      <input
                        type="radio"
                        name="{{ question.id }}"
                        value="unknown"
                        data-score-crow="0"
                        data-score-raven="0"
                        data-score-neither="0"
                        data-reason=""
                        required
                      >
                      <span>
                        <strong>Unclear</strong>
                        <p class="caw-quiz__hint">Sometimes you just don't know</p>
                      </span>
                    </span>
                  <div class="caw-quiz__unclear-graphic" aria-hidden="true">🤷</div>
                    <div class="caw-quiz__points" aria-live="polite">
                      <ul class="caw-quiz__point-badges" aria-label="Points added by this choice">
                        <li><span class="caw-quiz__point-badge">No points added</span></li>
                      </ul>
                    </div>
                  </label>
                </article>
            </div>
          </fieldset>
        {% endfor %}
      </div>

    <div class="caw-quiz__status">
      <strong data-caw-progress>0 / {{quizData | size}} questions answered</strong>
      <ul class="caw-quiz__chips" aria-label="Current quiz scores">
        <li><span class="caw-quiz__chip" data-team="crow">Crow: <span data-score="crow">0</span></span></li>
        <li><span class="caw-quiz__chip" data-team="raven">Raven: <span data-score="raven">0</span></span></li>
        <li><span class="caw-quiz__chip" data-team="neither">Neither: <span data-score="neither">0</span></span></li>
      </ul>
    </div>
      <section class="caw-quiz__result" data-caw-result aria-live="polite">
        <h3 data-caw-result-title></h3>
        <p data-caw-result-body></p>
        <ul data-caw-result-reasons></ul>
        <p><em>This is a learning game, not a formal checklist ID. Use a local guide and range info for final confirmation.</em></p>
      </section>

      <div class="caw-quiz__footer">
        <button type="reset">Reset quiz</button>
      </div>

  </form>
  <noscript>
    <p><strong>Scoring is unavailable without JavaScript.</strong> You can still use all questions and media references as a manual checklist.</p>
  </noscript>
</section>

<script type="module">
  const quizRoot = document.querySelector('[data-caw-quiz]');
  if (!quizRoot) {
    throw new Error('Caw quiz root not found');
  }

  const form = quizRoot.querySelector('[data-caw-form]');
  const questionFields = Array.from(
    quizRoot.querySelectorAll('[data-question-id]'),
  );
  const progressEl = quizRoot.querySelector('[data-caw-progress]');
  const resultEl = quizRoot.querySelector('[data-caw-result]');
  const resultTitleEl = quizRoot.querySelector('[data-caw-result-title]');
  const resultBodyEl = quizRoot.querySelector('[data-caw-result-body]');
  const resultReasonsEl = quizRoot.querySelector('[data-caw-result-reasons]');

  const scoreEls = {
    crow: quizRoot.querySelector('[data-score="crow"]'),
    raven: quizRoot.querySelector('[data-score="raven"]'),
    neither: quizRoot.querySelector('[data-score="neither"]')
  };

  const selectedOptionByQuestion = () =>
    questionFields
      .map((field) => field.querySelector('input[type="radio"]:checked'))
      .filter(Boolean);

  const summarizeResult = (totals) => {
    const scores = [
      { team: 'crow', score: totals.crow, label: 'crow' },
      { team: 'raven', score: totals.raven, label: 'raven' },
      { team: 'neither', score: totals.neither, label: 'another black bird (neither)' },
    ].toSorted((a, b) => b.score - a.score);

    const top = scores[0];
    const runnerUp = scores[1];
    const topGap = top.score - runnerUp.score;

    if (totals.neither >= totals.crow + 2 && totals.neither >= totals.raven + 2) {
      return {
        team: 'neither',
        title: 'Most Likely: Neither Crow Nor Raven',
        body: 'Your answers point more strongly to another black bird group such as blackbirds, starlings, vultures, or cormorants.'
      };
    }

    if (topGap <= 1) {
      return {
        team: 'tie',
        title: 'Too Close To Call',
        body: `${top.label} and ${runnerUp.label} are both plausible based on your picks. Try to confirm with tail shape in flight, vocalizations, and overall behavior.`
      };
    }

    if (totals.crow > totals.raven) {
      return {
        team: 'crow',
        title: 'Most Likely: American Crow',
        body: 'Your selected traits align more with crow size, voice, and behavior.'
      };
    }

    return {
      team: 'raven',
      title: 'Most Likely: Common Raven',
      body: 'Your selected traits align more with raven bulk, shape, and flight style.'
    };
  };

  const teamScoreKey = { crow: 'scoreCrow', raven: 'scoreRaven', neither: 'scoreNeither' };

  const buildReasons = (selectedOptions, winnerTeam) => {
    const key = teamScoreKey[winnerTeam];
    const reasonCandidates = selectedOptions
      .map((optionEl) => ({
        text: optionEl.dataset.reason,
        weight: key
          ? Number(optionEl.dataset[key])
          : Math.max(Number(optionEl.dataset.scoreCrow), Number(optionEl.dataset.scoreRaven), Number(optionEl.dataset.scoreNeither)),
      }))
      .filter((entry) => entry.text && entry.weight > 0)
      .toSorted((a, b) => b.weight - a.weight)
      .slice(0, 3);

    if (!reasonCandidates.length) {
      return ['No single clue was dominant, so compare multiple traits together.'];
    }

    return reasonCandidates.map((entry) => entry.text);
  };

  const updateQuizState = () => {
    const selectedOptions = selectedOptionByQuestion();
    const totalQuestions = questionFields.length;
    const answeredQuestions = selectedOptions.length;

    progressEl.textContent = `${answeredQuestions} / ${totalQuestions} questions answered`;

    const totals = selectedOptions.reduce(
      (acc, optionEl) => ({
        crow: acc.crow + Number(optionEl.dataset.scoreCrow),
        raven: acc.raven + Number(optionEl.dataset.scoreRaven),
        neither: acc.neither + Number(optionEl.dataset.scoreNeither),
      }),
      { crow: 0, raven: 0, neither: 0 },
    );

    scoreEls.crow.textContent = String(totals.crow);
    scoreEls.raven.textContent = String(totals.raven);
    scoreEls.neither.textContent = String(totals.neither);

    if (answeredQuestions === 0) {
      resultEl.dataset.team = 'tie';
      resultTitleEl.textContent = 'Pick Any Card To Start';
      resultBodyEl.textContent = 'Your live best guess will appear as soon as you choose one option. You do not need to answer every question.';
      resultReasonsEl.replaceChildren();
      const li = document.createElement('li');
      li.textContent = 'Scores and explanations will appear here.';
      resultReasonsEl.append(li);
      return;
    }

    const summary = summarizeResult(totals);
    const reasons = buildReasons(selectedOptions, summary.team);
    const prefix = answeredQuestions < totalQuestions
      ? `Current best guess from ${answeredQuestions} of ${totalQuestions} answered questions.`
      : 'Final result from all answered questions.';

    resultEl.dataset.team = summary.team;
    resultTitleEl.textContent = summary.title;
    resultBodyEl.textContent = `${prefix} ${summary.body}`;
    resultReasonsEl.replaceChildren();
    reasons.forEach((reason) => {
      const li = document.createElement('li');
      li.textContent = reason;
      resultReasonsEl.append(li);
    });
  };

  updateQuizState();

  form.addEventListener('change', updateQuizState);
  form.addEventListener('reset', () => {
    setTimeout(() => {
      updateQuizState();
      quizRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  });
</script>

{% endremoveindents %}

## Some More Tips

To expand on the quiz, here are some more details about what I look at to identify birds.

### How big is it?

An American crow is larger than most songbirds like a robin.
But it is smaller than most hawks.
By contrast, a Common Raven can be as big as a large hawk.
This can be hard to distinguish without a reference point, but side-by-side or relative to a physical object the two are usually distinguishable.
This size difference is also more significant in the Western United States, where the crows tend to be smaller.

<figure>
<iframe src="https://macaulaylibrary.org/asset/431540671/embed" height="519" width="640" frameborder="0" allowfullscreen></iframe>
<figcaption>Here, an American Crow is chasing off a Common Raven, showing a significant size difference</figcaption>
</figure>

### How big is the bill?

An American Crow's bill is relatively thick for a bird, but eventually tapers down to a point.
The Common Raven's bill is thicker relative to its body, often has more feathers covering it, and does not taper until close to the tip.
At first, this looks really subtle, but eventually, you'll start to notice.

![A black bird with a rounded wedge shaped bill and a little pink in the corner of the mouth perched on a roof.](/assets/img/caw-jv-crow.jpg 'This is an American Crow based on the taper of the bill. The pink is because he is a juvenile.')

### What shape is the tail?

If the bird is flying, try to look for the tail shape.
American Crows' tail feathers are more even in length which gives their tail a more square look when closed or an even fan look when spread out.
By contrast, a Common Raven has longer feathers near the center of the tail.
This can make their tail look almost diamond shaped.
It still fans out when spread wide, but the middle should be notably longer than the sides.

A word of caution, this is easy to mess up and different tail positions can be misleading.
If a raven's tail is completely spread out, it can be hard to notice the diamond shape.
Sometimes the edges of a crow's tail can make it look diamond shaped.
This is why it's best to combine a few marks to make an identification.

### Are they ganging up on a larger bird?

If a lot of black birds are all chasing after a hawk, they may be crows.
Many species of birds like mockingbirds or even small sparrows do this, especially during breeding season to protect their young.
Some smaller blackbirds, like Red-winged Blackbirds are also very protective of their territory, particularly when nesting.
But crows are well known for grouping up to chase off a hawk in a behavior called "mobbing".
Crows will also mob ravens so if there is a size difference between the two black birds, you might have both.

### How many are there?

This is a weak clue, since crows and ravens can both be in large or small groups.
But ravens tend to either be alone or in pairs.
By contrast, crows frequently form large flocks.
Again, this isn't always consistent.
Crows spend lots of time on their own, and I've seen flocks of ravens with as many as 30 individuals, but this clue can still help inform an ID.

### Where are you?

While crows and ravens are widespread in the United States, there are fewer ravens in the central U.S. states.
Ravens tend to cover more ground or live in more remote areas than American Crows, though both are known to take advantage of various human handouts.
Location is also key for the two other crows/ravens you might encounter in the United States.

### What sound is it making?

Birds won't always identify themselves, but making sounds is the closest thing to it for corvids.
This is one of the easiest ways to ID a bird because it works from a distance even if you don't have a view in your binoculars.
Crows are known for their "caw".
Raven calls tend to be much lower and grovelly.
Note that both species can make a variety of sounds like pops or a low frequency grumble.
They have also been known to imitate other sounds, though not as frequently as parrots or mockingbirds do.
Crows tend to be noticeably higher pitched than ravens, but still low pitched, more like a cough than a song.

- [American Crow Caw](https://www.allaboutbirds.org/guide/American_Crow/sounds)
- [Common Raven Call](https://www.allaboutbirds.org/guide/Common_Raven/sounds)

## Bonus Round

Okay, so you're pretty sure it is either a crow or raven.
Now let's make things more complicated!
Are you sure what kind of crow/raven?

### American Crow or Fish Crow?

In the Eastern United States, there's another tricky identification challenge.
This time it's still a crow!
The Fish Crow looks very similar to an American Crow.
There are very slight differences in size and their wings.
Fish crows also tend to live closer to water.
But the easiest way to distinguish them, just like with ravens, is by their "caw"!
Fish crows sound more nasally, almost like a squeaker dog toy.
An American Crow will sound more like a full-throated "caw".

<figure>
<iframe src="https://macaulaylibrary.org/asset/456444101/embed" height="511" width="640" frameborder="0" allowfullscreen></iframe>
</figure>

[All About Birds: Fish Crow vs American Crow](https://www.allaboutbirds.org/guide/Fish_Crow/species-compare/59858041)

### Common Raven or Chihuahuan Raven?

In parts of southern Arizona, southern or eastern New Mexico, western Texas, and even parts of southeastern Colorado, another raven, the Chihuahuan Raven, can be found.
It's typically found in lower elevations around dry, open land.
They are slightly smaller than Common Ravens and the base of their feathers is white rather than gray.
Their nasal bristles are typically longer compared to the Common Raven, and their voice higher but still lower than a crow.

<figure>
<iframe src="https://macaulaylibrary.org/asset/560951321/embed" height="510" width="320" frameborder="0" allowfullscreen></iframe>
<figcaption>Here the wind is exposing the lighter base feather color</figcaption>
</figure>

<figure>
<iframe src="https://macaulaylibrary.org/asset/158189771/embed" height="510" width="320" frameborder="0" allowfullscreen></iframe>
<figcaption>Listen to the Chihuahuan call here</figcaption>
</figure>

[All About Birds: Chihuahuan Raven vs Common Raven](https://www.allaboutbirds.org/guide/Chihuahuan_Raven/species-compare/63739541)

## Other Black Birds

There are several other black birds found commonly in North America.

### The Blackbird Family

Outside of the corvid family, the most significant group of birds in the United States with several all-black species is aptly namely the blackbirds.
A key distinction here is that members of the blackbird family are significantly smaller than crows and ravens.
If you look closely and have favorable lighting, you may also find the bird is not entirely black, either in the eye, or a more purple color to the feathers.
The females are also usually more brown than black, so if a group is 50/50% black and brown, they are probably blackbirds.

Some notable birds in this family include:

- [Brewer's Blackbird](https://ebird.org/species/brebla)
- [Great-tailed Grackles](https://ebird.org/species/grtgra)
- [Common Grackles](https://ebird.org/species/comgra)

![A black bird on a stone walkway](/assets/img/2023-birding-grackle.jpg "A [Brewer's Blackbird](https://ebird.org/species/brebla)")

Despite the name, some members of the blackbird family can be quite colorful.
In fact, New World Orioles are also members of the New World Blackbird family known by its Latin name, Icteridae.

{% include "embed-link.html"
    title: "Hooded Oriole"
    url: "https://ebird.org/species/hooori/"
    description: "Rather slender, long-tailed oriole. Adult males are orange with a black mask and throat and obvious white shoulder patch. Variable color intensity…"
    img: "/assets/img/embed-thumbnail-hooded-oriole.jpg"
    alt: "orange bird with black and white wings and black face."
    objectPosition: "80% center"
%}

{% include "embed-link.html"
    title: "Baltimore Oriole"
    url: "https://ebird.org/species/balori"
    description: "The common oriole in the eastern U.S., wintering to northern South America. Adult males are stunning: bright orange with a black head and…"
    img: "/assets/img/embed-thumbnail-baltimore-oriole.jpg"
    alt: "An orange bird with a black head on a branch"
    objectPosition: "50% center"
%}

### Cormorants

One family of birds that is large like a raven, but definitely not a crow, is the cormorants.
Cormorants have long necks, and rapid, shallow wingbeats.
Their diet is almost entirely fish and they spend most of their time in or around the water.
When they are still, their long necks will likely tell you, not a crow.
If they are flying, their wingbeats are much faster than a crow or raven and they tend to travel in a very straight line.

The [Double-crested Cormorant](https://ebird.org/species/doccor) is the most widespread in the US, often appearing near inland lakes and rivers.
On the west coast other cormorants like [Pelagic](https://ebird.org/species/pelcor) and [Brandt's Cormorant](https://ebird.org/species/bracor) are common.
You can easily find a colony of nest Brandt's cormorants on the cliffs in La Jolla, San Diego during the right time of the year.

![black bird with long neck and red bill on a cliff.](/assets/img/2020-birding-ca-double-crested-cormorant.jpg "[Double-crested Cormorant](https://ebird.org/species/doccor) in its breeding colors")

### Vultures

Vultures are most often seen in flight and can at a glance look like ravens.
However vultures have much larger wings and their head looks proportionally tiny.
Plus their wings usually have some lighter sections.
For [Turkey Vultures](https://ebird.org/species/turvul), the trailing side of the wing often looks almost gray and their (relatively small) head is red.
For [Black Vultures](https://ebird.org/species/blkvul), the "finger" features on the ends of the wings will usually show some white.

<figure>
<iframe src="https://macaulaylibrary.org/asset/559796571/embed" height="510" width="640" frameborder="0" allowfullscreen></iframe>
<figcaption>A black vulture with a raven</figcaption>
</figure>

### Starlings

The [European Starling](https://ebird.org/species/eursta) was introduced from Europe and is now well established across North America.
They are much smaller than crows and their feathers can have spots and an iridescent, almost rainbow hue in the right light.
Outside of breeding season, their plumage becomes duller and their spots more noticeable.
But sometimes they just look like black birds.

They have color on their bill and legs which corvids like crows and ravens normally do not have.
Their wings are short and quickly come to a point so in flight their wings look like little triangles.
They are better imitators than the corvids and make a variety of sounds including some metallic noises.

<figure>
<iframe src="https://macaulaylibrary.org/asset/374391841/embed" height="519" width="640" frameborder="0" allowfullscreen></iframe>
<figcaption>Crows and starlings together</figcaption>
</figure>

---

To learn more about identifying crows and ravens, check out these resources:

- [Are you playing #CrowOrNo yet? | Corvid Research](https://corvidresearch.blog/2016/12/21/are-you-playing-croworno-yet/) A post by Kaeli Swift, Ph.D. who is an Ornithologist and a partial inspiration for this game.
- [How to Tell Crows and Ravens Apart by Sight and Sound | All About Birds](https://www.allaboutbirds.org/news/similar-species-crows-and-ravens/)

_This page was inspired by [FractalKitty](https://banjomagpi.com/caw/) and [others](https://indieweb.org/caw)._
_Many thanks to the Macaulay Library and those who contributed the embedded media._
_Thanks to the Kaeli Swift, Ph. D for sharing lots of great corvid facts on the CrowOrNo hashtag._
