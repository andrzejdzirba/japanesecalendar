  <script>
    import RangeSlider from "svelte-range-slider-pips";
    import "../styles/style-output.css";

    let CalendarData = [
      {id:'0',calid: "all", name: '西暦 ', start:'1868', end:'2022', dur: '154', diff:'0', curr:[2020]},
      {id:'1',calid: "rv", name: '令和 ', start:'2019', end:'2022', dur: '4', diff:'2019', curr:[4]},
      {id:'2',calid: "hv", name: '平成 ', start:'1989', end:'2019', dur: '31', diff:'1989', curr:[31]},
      {id:'3',calid: "sv", name: '昭和 ', start:'1926', end:'1989', dur: '64', diff:'1926', curr:[64]},
      {id:'4',calid: "tv", name: '大正', start:'1912', end:'1926', dur: '15', diff:'1912', curr:[15]},
      {id:'5',calid: "mv", name: '明治', start:'1868', end:'1912', dur: '45', diff:'1868', curr:[45]},
    ];
 
 
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
                  if (makeVisible.classList.contains("opacity-20")) {
                    makeVisible.classList.remove("opacity-20");
                  }

              }

              else {
                // make opacity 20 if is not withis range 

                if (!makeVisible.classList.contains("opacity-20")) {
                    makeVisible.classList.add("opacity-20");
                  }

              }

            }

 
    }
  
 

  </script>

  <div id="mainwrapper" class=" h-full w-full bg-gradient-to-r from-gray-100 to-gray-300">
 
   <div class="container mx-auto"> 

    <div class="m-2 p-2">

      <h1 class="uppercase text-black-500 text-3xl jap">
        西暦 カルキュレーター
      </h1>
      
    </div>

    
      <div class="text-black jap border border-2 border-red-200 m-2 p-2 bg-gray-50 hover:bg-white duration-300 drop-shadow-md">
      <h2>西暦 {CalendarData[0].curr} 年</h2>
        <RangeSlider 	on:change={(e) => { handleSliderChange('all',0,e.detail.value)}} id="all" min={1868} max={2022} bind:values={CalendarData[0].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>
 




      <div class="sliderwrapper jap opacity-20 text-black border border-2 border-gray-300 m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>令和 {CalendarData[1].curr} 年 </h2>
        <RangeSlider on:change={(e) => { handleSliderChange('rv',1, e.detail.value)}} id="rv" min={1} max={4} bind:values={CalendarData[1].curr} pips float  first='label' step={1} pipstep={50} rest='label' />
      </div>
 


      <div class="sliderwrapper jap opacity-20 text-black border border-2 border-gray-300 m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>平成 {CalendarData[2].curr} 年 </h2>
        <RangeSlider on:change={(e) => { handleSliderChange('hv',2,e.detail.value)}} id="hv" min={1} max={31}  bind:values={CalendarData[2].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>

 


      <div class="sliderwrapper jap opacity-20 text-black border border-2 border-gray-300 m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>昭和 {CalendarData[3].curr} 年 </h2>
        <RangeSlider  on:change={(e) => { handleSliderChange('sv',3,e.detail.value)}} id="sv" min={1} max={64}  bind:values={CalendarData[3].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>
 




      <div class="sliderwrapper jap opacity-20 text-black border border-2 border-gray-300 m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>大正 {CalendarData[4].curr} 年 </h2>
        <RangeSlider  on:change={(e) => { handleSliderChange('tv',4,e.detail.value)}} id="tv" min={1} max={15}  bind:values={CalendarData[4].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>

 



      
      <div class="sliderwrapper jap opacity-20 text-black border border-2 border-gray-300 m-2 p-2 bg-gray-100 hover:drop-shadow hover:bg-gray-50 duration-300">
        <h2>明治 {CalendarData[5].curr} 年 </h2>
        <RangeSlider  on:change={(e) => { handleSliderChange('mv',5,e.detail.value)}} id="mv" min={1} max={45}  bind:values={CalendarData[5].curr} pips float  first='label' step={1} pipstep={50} rest='label'/>
      </div>
 

 

      <div class="my-10 jap border border-1 border-gray-200 m-2 p-2">

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