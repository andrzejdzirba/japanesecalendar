  <script>
    import RangeSlider from "svelte-range-slider-pips";
 

    import "../styles/style-output.css";

    let CalendarData = [
      {id:'0',calid: "all", name: '西暦 ', start:'1868', end:'2022', dur: '154', diff:'0', colour: '#FCC9B9', curr:[2020]},
      {id:'1',calid: "rv", name: '令和 ', start:'2019', end:'2022', dur: '4', diff:'2019', colour: '#89729E', curr:[4]},
      {id:'2',calid: "hv", name: '平成 ', start:'1989', end:'2019', dur: '31', diff:'1989', colour: '#FFA631', curr:[31]},
      {id:'3',calid: "sv", name: '昭和 ', start:'1926', end:'1989', dur: '64', diff:'1926', colour: '#645530', curr:[64]},
      {id:'4',calid: "tv", name: '大正', start:'1912', end:'1926', dur: '15', diff:'1912', colour: '#F8674F', curr:[15]},
      {id:'5',calid: "mv", name: '明治', start:'1868', end:'1912', dur: '45', diff:'1868', colour: '#1F4788', curr:[45]},
    ];
 

    let all_colour = '#000';
 
    const handleSliderChange = (element, CalendarIndex, CalendarValue) => {
 

      // set main slider if subslider changes 

      if ( CalendarIndex !== 0) {
        let newMainValue = parseInt(CalendarData[CalendarIndex].diff) +  parseInt(CalendarData[CalendarIndex].curr[0]) -1;
        CalendarData[0].curr = [newMainValue];
      }
 

      // set subsliders - except for the one which was manipulated and the main one (it was already set)
          CalendarData.forEach(era => {
            
            if (era.calid !== element && era.calid !== 'all') {

                let newSliderValue = parseInt(CalendarData[0].curr) -  parseInt(CalendarData[era.id].diff) + 1;

                CalendarData[era.id].curr[0] = newSliderValue;

            }
             
          });

 
          // set opacity of elements after change of data 
          for (let i = 1; i < CalendarData.length; i++) {
            
            let activeSlider = document.getElementById(CalendarData[i].calid);
            let makeVisible = activeSlider.closest(".sliderwrapper");

             if (CalendarData[0].curr >= CalendarData[i].start && CalendarData[0].curr <= CalendarData[i].end) {
              

                // make opacity 100 if this elment is within selected range 
                  if (makeVisible.classList.contains("opacity-30")) {
                    makeVisible.classList.remove("opacity-30");
                  }

                  // set float to be visible via class 

                  if (! makeVisible.classList.contains("activefloat")) {
                    makeVisible.classList.add("activefloat");
                  }

                  //set colours od sliders 
                  makeVisible.style.borderColor = CalendarData[i].colour;
                  all_colour = CalendarData[i].colour;

              }

              else {
                // make opacity 20 if is not withis range 

                  if (!makeVisible.classList.contains("opacity-30")) {
                    makeVisible.classList.add("opacity-30");
                  }

                  if (makeVisible.classList.contains("activefloat")) {
                    makeVisible.classList.remove("activefloat");
                  }

                  makeVisible.style.borderColor = "transparent";

              }

            }

 
    }
  

  //dropdown and language changes 

    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
 
    let show = false;  
    let menu = null;  

    let lang = 'jp'; 

    onMount(() => {
      const handleOutsideClick = (event) => {
        if (show && !menu.contains(event.target)) {
          show = false;
        }
      };

      const handleEscape = (event) => {
        if (show && event.key === 'Escape') {
          show = false;
        }
      };

      // add events when element is added to the DOM
      document.addEventListener('click', handleOutsideClick, false);
      document.addEventListener('keyup', handleEscape, false);

      // remove events when element is removed from the DOM
      return () => {
        document.removeEventListener('click', handleOutsideClick, false);
        document.removeEventListener('keyup', handleEscape, false);
      };
    });


    // pipstep init 
    let all_pipstep = 60;
 
  </script>


 

<div id="mainwrapper" class="h-full w-full">
  <div id="mainkanji" class="h-full w-full p-5">

     
 
   <div class="container mx-auto bg-white opacity-90 w-full lg:w-2/3 drop-shadow rounded"> 

        <div class="px-2  py-5 flex items-center">

          <img class="inline-flex" src="/9965.png" alt="西暦 カルキュレーター" />

          <h1 class="inline-flex grow  uppercase text-black-500 text-xl jap">
            西暦 カルキュレーター
          </h1>


       
            <div class="relative z-50 justify-self-end" bind:this={menu}>
 
                <button
                  on:click={() => (show = !show)}
                  class="menu">
                  <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 0 24 24" width="26" fill="#333"><path d="M21 4H11l-1-3H3c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8l1 3h9c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 16c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.35 0 2.48.5 3.35 1.3L9.03 8.57c-.38-.36-1.04-.78-2.03-.78-1.74 0-3.15 1.44-3.15 3.21S5.26 14.21 7 14.21c2.01 0 2.84-1.44 2.92-2.41H7v-1.71h4.68c.07.31.12.61.12 1.02C11.8 13.97 9.89 16 7 16zm6.17-5.42h3.7c-.43 1.25-1.11 2.43-2.05 3.47-.31-.35-.6-.72-.86-1.1l-.79-2.37zm8.33 9.92c0 .55-.45 1-1 1H14l2-2.5-1.04-3.1 3.1 3.1.92-.92-3.3-3.25.02-.02c1.13-1.25 1.93-2.69 2.4-4.22H20v-1.3h-4.53V8h-1.29v1.29h-1.44L11.46 5.5h9.04c.55 0 1 .45 1 1v14z"/><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/></svg>
                </button>
            
                {#if show}
                  <ul
                    in:scale={{ duration: 100, start: 0.95 }}
                    out:scale={{ duration: 75, start: 0.95 }}
                    class="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-gray-100 rounded shadow-md">
                    <li><a on:click|preventDefault={() => {lang = 'jp'; (show = !show) }} href="#" class="block px-4 py-2 hover:bg-gray-500 hover:text-gray-100 duration-300 flex justify-around items-center"><span class="inline-flex"><small>日本語</small></span><span class="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#eee" d="M0 0h512v512H0z"/><circle cx="256" cy="256" r="111.3" fill="#d80027"/></g></svg></span></a></li>
                    <li><a on:click|preventDefault={() => {lang = 'eng'; (show = !show) }} href="#" class="block px-4 py-2 hover:bg-gray-500 hover:text-gray-100 duration-300 flex justify-around items-center"><span class="inline-flex"><small>english</small></span><span class="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#eee" d="M0 0h47.4l76.4 21 65.4-21h33.4l34.2 16.6L289.4 0h33.4l70.4 22.8L464.8 0h15.8l12.2 7.3L512 0v47.3l-19.9 78 19.9 63.9v33.4l-16.4 30.6 16.4 36.2v33.4l-15.1 68.7 15.1 73.3v15.9l-7.8 10.9L512 512h-47.3l-71-17.5-70.9 17.5h-33.4l-30-19.7-36.8 19.7h-33.3l-63.7-20.2L47.3 512H31.4l-10.6-8L0 512v-47.3l22.8-79L0 322.9v-33.4l25.3-32L0 222.6v-33.4l22.2-64.6L0 47.2V31.4l8-7.8z"/><path fill="#0052b4" d="m47.4 0 141.8 142V0H47.4zm275.4 0v142l142-142h-142zM0 47.2v142h142L0 47.2zm512 .1L370.1 189.2H512V47.3zM0 322.8v141.9l141.9-141.9H0zm370 0 142 142v-142H370zM189.3 370l-142 142h142V370zm133.5.1V512h141.9L322.8 370.1z"/><path fill="#d80027" d="M222.6 0v222.6H0v66.8h222.6V512h66.8V289.4H512v-66.8H289.4V0h-66.8z"/><path fill="#d80027" d="M0 0v31.4l157.7 157.8h31.5L0 0zm480.6 0L322.8 157.7v31.5L512 0h-31.4zM189.2 322.8 0 512h31.4l157.8-157.7v-31.5zm133.6 0L511.9 512h.1v-31.3L354.3 322.8h-31.5z"/></g></svg></span></a></li>
                    <li><a on:click|preventDefault={() => {lang = 'pl'; (show = !show) }} href="#" class="block px-4 py-2 hover:bg-gray-500 hover:text-gray-100 duration-300 flex justify-around items-center"><span class="inline-flex"><small>polski</small></span><span class="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#d80027" d="m0 256 256.4-44.3L512 256v256H0z"/><path fill="#eee" d="M0 0h512v256H0z"/></g></svg></a></li>
                    <li><a on:click|preventDefault={() => {lang = 'kr'; (show = !show) }} href="#" class="block px-4 py-2 hover:bg-gray-500 hover:text-gray-100 duration-300 flex justify-around items-center"><span class="inline-flex"><small>한국어</small></span><span class="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#eee" d="M0 0h512v512H0z"/><path fill="#d80027" d="M345 256c0 22.3-39.8 78-89 78s-89-55.7-89-78a89 89 0 1 1 178 0z"/><path fill="#0052b4" d="M345 256a89 89 0 1 1-178 0"/><path fill="#333" d="m350.4 334.7 23.7-23.6 15.7 15.7-23.6 23.6zm-39.3 39.4 23.6-23.7 15.7 15.8-23.6 23.6zm86.6 7.8 23.6-23.6L437 374l-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7L374 437zm15.8-63 23.6-23.6 15.7 15.7-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7-23.7 23.6zm63-220.4-63-63 15.8-15.7 63 63zm-63-15.7-23.6-23.7 15.7-15.7 23.7 23.6zm39.4 39.3-23.7-23.6 15.8-15.7 23.6 23.6zm7.8-86.6-23.6-23.6L374 75l23.7 23.6zm39.4 39.4L397.7 130l15.7-15.8L437 138zM90.7 358.3l63 63-15.8 15.7-63-63zm63 15.7 23.6 23.7-15.7 15.7-23.7-23.6zm-39.4-39.3 23.6 23.6-15.7 15.8-23.6-23.7zm23.6-23.6 63 63-15.7 15.7-63-63zm15.8-220.4-63 63L75 137.9l63-63zm23.6 23.6-63 63-15.7-15.8 63-63zm23.6 23.6-63 63-15.7-15.7 63-63z"/></g></svg></span></a></li>
                    <li><a on:click|preventDefault={() => {lang = 'cn'; (show = !show) }} href="#" class="block px-4 py-2 hover:bg-gray-500 hover:text-gray-100 duration-300 flex justify-around items-center"><span class="inline-flex"><small>中文</small></span><span class="inline-flex"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#d80027" d="M0 0h512v512H0z"/><path fill="#ffda44" d="m140.1 155.8 22.1 68h71.5l-57.8 42.1 22.1 68-57.9-42-57.9 42 22.2-68-57.9-42.1H118zm163.4 240.7-16.9-20.8-25 9.7 14.5-22.5-16.9-20.9 25.9 6.9 14.6-22.5 1.4 26.8 26 6.9-25.1 9.6zm33.6-61 8-25.6-21.9-15.5 26.8-.4 7.9-25.6 8.7 25.4 26.8-.3-21.5 16 8.6 25.4-21.9-15.5zm45.3-147.6L370.6 212l19.2 18.7-26.5-3.8-11.8 24-4.6-26.4-26.6-3.8 23.8-12.5-4.6-26.5 19.2 18.7zm-78.2-73-2 26.7 24.9 10.1-26.1 6.4-1.9 26.8-14.1-22.8-26.1 6.4 17.3-20.5-14.2-22.7 24.9 10.1z"/></g></svg></span></a></li>
                  </ul>
                {/if}
              </div>
 
        </div>


        <div class="bg-gray-100 p-5 duration-300 drop-shadow-md">

          {#if lang=='jp'}
          スライダーを動かすことで、年号から西暦を、西暦から年号を知ることができます。
          {/if}
          
          {#if lang=='eng'}
          Use sliders below to translatate both ways between western years ( 西暦 ) and years according to japanese calendar ( 令和, 平成, 昭和, 大正, 明治 ). 
          {/if}
          
          {#if lang=='pl'}
          Użyj sliderów poniżej aby przełożyć kalendarz zachodni, na lata liczone według kaledarza japońskiego.
          {/if}

          {#if lang=='kr'}
          슬라이더를 움직이면 일본 연호와 대응하는 년도를 알 수 있습니다
          {/if}
          
          {#if lang=='cn'}
          滑动点， 可以了解西历史和日本年号的对应关系。
          {/if}
        
        </div>
 

      <div class="text-black jap border opacity-95 rounded-sm shadow-md  m-2 p-2 bg-gradient-to-r from-white to-gray-100  hover:bg-white duration-300 drop-shadow-md" style="--range-handle-focus: {all_colour}; --range-handle: {all_colour}; --range-handle-inactive:{all_colour};">
      <h2>西暦 {CalendarData[0].curr} 年</h2>
        <RangeSlider 	on:change={(e) => { handleSliderChange('all',0,e.detail.value)}} id="all" min={1868} max={2022} bind:values={CalendarData[0].curr} pips float  first='label' last='label' step={1} pipstep={all_pipstep} rest='label'/>
      </div>
 




      <div class="sliderwrapper jap opacity-30 text-black border-x-4 border-x-transparent rounded-md m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>令和 {CalendarData[1].curr} 年 </h2>
        <RangeSlider on:change={(e) => { handleSliderChange('rv',1, e.detail.value)}} id="rv" min={1} max={4} bind:values={CalendarData[1].curr} pips float  first='label' step={1} pipstep={50} rest='label' />
      </div>
 


      <div class="sliderwrapper jap opacity-30 text-black border-x-4 border-x-transparent rounded-md m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>平成 {CalendarData[2].curr} 年 </h2>
        <RangeSlider on:change={(e) => { handleSliderChange('hv',2,e.detail.value)}} id="hv" min={1} max={31}  bind:values={CalendarData[2].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>

 


      <div class="sliderwrapper jap opacity-30 text-black border-x-4 border-x-transparent rounded-md m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>昭和 {CalendarData[3].curr} 年 </h2>
        <RangeSlider  on:change={(e) => { handleSliderChange('sv',3,e.detail.value)}} id="sv" min={1} max={64}  bind:values={CalendarData[3].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>
 




      <div class="sliderwrapper jap opacity-30 text-black border-x-4 border-x-transparent rounded-md m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>大正 {CalendarData[4].curr} 年 </h2>
        <RangeSlider  on:change={(e) => { handleSliderChange('tv',4,e.detail.value)}} id="tv" min={1} max={15}  bind:values={CalendarData[4].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>

  

      
      <div class="sliderwrapper jap opacity-30 text-black border-x-4 border-x-transparent rounded-md m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>明治 {CalendarData[5].curr} 年 </h2>
        <RangeSlider  on:change={(e) => { handleSliderChange('mv',5,e.detail.value)}} id="mv" min={1} max={45}  bind:values={CalendarData[5].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>
 

 

      <div class="bg-gray-100 p-5 duration-300 drop-shadow-md">

            明治	めいじ	1868～1912
            <br />
            大正	たいしょう	1912～1926	
            <br />
            昭和	しょうわ	1926～1989	
            <br />
            平成	へいせい	1989～2019
            <br />
            令和 れいわ　2019～
            
          </div>

        </div>
    </div>
 
  </div>