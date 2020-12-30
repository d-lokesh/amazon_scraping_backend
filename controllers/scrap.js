
import e from 'express';
import { getHTML, getAmazonPrice } from '../scrape';



const scrap = async (req, res) => {
  const products = {
    "RunningShoes": ["https://www.amazon.in/Asian-shoes-Sports-Firozi-Indian/dp/B01MRN1BY4/ref=sr_1_5?crid=SSHI48GOS85D&dchild=1&keywords=running+shoes+for+boys&qid=1609132133&sprefix=running+sh%2Caps%2C446&sr=8-5", "https://www.amazon.in/Ethics-Perfect-Ultra-Sport-Shoes/dp/B081NM4H3H/ref=sr_1_6?crid=SSHI48GOS85D&dchild=1&keywords=running+shoes+for+boys&qid=1609132133&sprefix=running+sh%2Caps%2C446&sr=8-6", "https://www.amazon.in/Mayank-SH-Training-Walking-Comfortable/dp/B0854R7YCD/ref=sr_1_3?crid=HRKYU0FZTEFD&dchild=1&keywords=running+shoes+for+boys&qid=1609169235&sprefix=running+sho%2Caps%2C726&sr=8-3", "https://www.amazon.in/Ethics-Perfect-CLYMB-Ultra-Sport/dp/B082HYJ83T/ref=sr_1_4?crid=HRKYU0FZTEFD&dchild=1&keywords=running+shoes+for+boys&qid=1609169235&sprefix=running+sho%2Caps%2C726&sr=8-4", "https://www.amazon.in/ASIAN-Bouncer-01-Stylish-Sneakers-Lightweight/dp/B08H12NBVH/ref=sr_1_8?crid=HRKYU0FZTEFD&dchild=1&keywords=running+shoes+for+boys&qid=1609169235&sprefix=running+sho%2Caps%2C726&sr=8-8", "https://www.amazon.in/Solefit-Mens-Running-Shoes-10-SLFT-1191/dp/B07ZJRWLGH/ref=sr_1_9?crid=HRKYU0FZTEFD&dchild=1&keywords=running+shoes+for+boys&qid=1609169235&sprefix=running+sho%2Caps%2C726&sr=8-9", "https://www.amazon.in/Sklodge-Mens-Black-Running-Shoe/dp/B08FXBCC86/ref=sr_1_10?crid=HRKYU0FZTEFD&dchild=1&keywords=running+shoes+for+boys&qid=1609169235&sprefix=running+sho%2Caps%2C726&sr=8-10"],
    "treadmill": ["https://www.amazon.in/Cockatoo-CTM-04-Motorised-Multi-Function-Treadmill/dp/B07DFYQC79/ref=sr_1_5?crid=4VVMKW67N55I&dchild=1&keywords=thread+mills&qid=1609169434&sprefix=thread+mi%2Caps%2C361&sr=8-5", "https://www.amazon.in/Treadmill-Electric-Motorized-Exercise-Equipment/dp/B08462LP5M/ref=sxin_9?ascsubtag=amzn1.osa.a1bc7128-a2d6-4499-8507-ba603df88f18.A21TJRUUN4KGV.en_IN&creativeASIN=B08462LP5M&crid=4VVMKW67N55I&cv_ct_cx=thread+mills&cv_ct_id=amzn1.osa.a1bc7128-a2d6-4499-8507-ba603df88f18.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=thread+mills&linkCode=oas&pd_rd_i=B08462LP5M&pd_rd_r=062e08e7-bb3e-4379-b848-f17f556d8933&pd_rd_w=f4nag&pd_rd_wg=yVofb&pf_rd_p=c2643bf4-911f-4931-9961-1c8e07844602&pf_rd_r=0PAZGMX03S0F32HPSYAG&qid=1609169434&sprefix=thread+mi%2Caps%2C361&sr=1-1-483c64d8-df78-4008-ae20-e69f683e58b1&tag=thebestones-21", "https://www.amazon.in/Kamachi-Motorized-Treadmill-Motor-111/dp/B06VTTM9J2/ref=sxin_9?ascsubtag=amzn1.osa.a1bc7128-a2d6-4499-8507-ba603df88f18.A21TJRUUN4KGV.en_IN&creativeASIN=B06VTTM9J2&crid=4VVMKW67N55I&cv_ct_cx=thread+mills&cv_ct_id=amzn1.osa.a1bc7128-a2d6-4499-8507-ba603df88f18.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=thread+mills&linkCode=oas&pd_rd_i=B06VTTM9J2&pd_rd_r=062e08e7-bb3e-4379-b848-f17f556d8933&pd_rd_w=f4nag&pd_rd_wg=yVofb&pf_rd_p=c2643bf4-911f-4931-9961-1c8e07844602&pf_rd_r=0PAZGMX03S0F32HPSYAG&qid=1609169434&sprefix=thread+mi%2Caps%2C361&sr=1-2-483c64d8-df78-4008-ae20-e69f683e58b1&tag=thebestones-21", "https://www.amazon.in/Powermax-Fitness-TDM-100M-Lubrication-Multifunction/dp/B07416CG1F/ref=sxin_9?ascsubtag=amzn1.osa.a1bc7128-a2d6-4499-8507-ba603df88f18.A21TJRUUN4KGV.en_IN&creativeASIN=B07416CG1F&crid=4VVMKW67N55I&cv_ct_cx=thread+mills&cv_ct_id=amzn1.osa.a1bc7128-a2d6-4499-8507-ba603df88f18.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=thread+mills&linkCode=oas&pd_rd_i=B07416CG1F&pd_rd_r=062e08e7-bb3e-4379-b848-f17f556d8933&pd_rd_w=f4nag&pd_rd_wg=yVofb&pf_rd_p=c2643bf4-911f-4931-9961-1c8e07844602&pf_rd_r=0PAZGMX03S0F32HPSYAG&qid=1609169434&sprefix=thread+mi%2Caps%2C361&sr=1-3-483c64d8-df78-4008-ae20-e69f683e58b1&tag=thebestones-21", "https://www.amazon.in/Lifelong-LLTM09-Motorized-HealthifyMe-Installation/dp/B07R4M527C/ref=sr_1_6?crid=4VVMKW67N55I&dchild=1&keywords=thread+mills&qid=1609169434&sprefix=thread+mi%2Caps%2C361&sr=8-6", "https://www.amazon.in/Durafit-Spark-1-25-Motorized-Treadmill/dp/B07PZSYK7X/ref=sr_1_8?crid=4VVMKW67N55I&dchild=1&keywords=thread+mills&qid=1609169434&sprefix=thread+mi%2Caps%2C361&sr=8-8", "https://www.amazon.in/Fitkit-FT98-Motorized-Treadmill-Installation/dp/B083DKRMW3/ref=sr_1_10?crid=4VVMKW67N55I&dchild=1&keywords=thread+mills&qid=1609169434&sprefix=thread+mi%2Caps%2C361&sr=8-10"],
    "Dumbbells": ["https://www.amazon.in/Kore-PVC-Home-Gym-Accessories/dp/B089DF1PXS/ref=sr_1_8?dchild=1&keywords=Dumbbells&qid=1609169696&sr=8-8", "https://www.amazon.in/AmazonBasics-Cast-Iron-Construction-Dumbbell-20-Pound/dp/B074DZ6NGS/ref=sxin_9_pb?cv_ct_cx=Dumbbells&dchild=1&keywords=Dumbbells&pd_rd_i=B074DZ6NGS&pd_rd_r=86d33c3c-cbbc-48db-ad33-73559fcd3150&pd_rd_w=wKUwj&pd_rd_wg=18brO&pf_rd_p=6fd88f24-e84e-4fb6-a393-3441855e4add&pf_rd_r=FK8P60V07V24SYDXD7JA&qid=1609169696&sr=1-1-cc7a04fe-cc55-42ad-b883-1b910070c86a", "https://www.amazon.in/AmazonBasics-Vinyl-Dumbbells-Pound-Set/dp/B07FNHWT3Z/ref=sxin_9_pb?cv_ct_cx=Dumbbells&dchild=1&keywords=Dumbbells&pd_rd_i=B07FNHWT3Z&pd_rd_r=86d33c3c-cbbc-48db-ad33-73559fcd3150&pd_rd_w=wKUwj&pd_rd_wg=18brO&pf_rd_p=6fd88f24-e84e-4fb6-a393-3441855e4add&pf_rd_r=FK8P60V07V24SYDXD7JA&qid=1609169696&sr=1-2-cc7a04fe-cc55-42ad-b883-1b910070c86a", "https://www.amazon.in/AmazonBasics-20-Pound-9-07-Dumbbell-Stand/dp/B0727Q5F94/ref=sxin_9_pb?cv_ct_cx=Dumbbells&dchild=1&keywords=Dumbbells&pd_rd_i=B0727Q5F94&pd_rd_r=86d33c3c-cbbc-48db-ad33-73559fcd3150&pd_rd_w=wKUwj&pd_rd_wg=18brO&pf_rd_p=6fd88f24-e84e-4fb6-a393-3441855e4add&pf_rd_r=FK8P60V07V24SYDXD7JA&qid=1609169696&sr=1-3-cc7a04fe-cc55-42ad-b883-1b910070c86a", "https://www.amazon.in/AmazonBasics-Quality-Cast-Iron-Construction-Dumbbell/dp/B074DZ65J3/ref=sxin_9_pb?cv_ct_cx=Dumbbells&dchild=1&keywords=Dumbbells&pd_rd_i=B074DZ65J3&pd_rd_r=86d33c3c-cbbc-48db-ad33-73559fcd3150&pd_rd_w=wKUwj&pd_rd_wg=18brO&pf_rd_p=6fd88f24-e84e-4fb6-a393-3441855e4add&pf_rd_r=FK8P60V07V24SYDXD7JA&qid=1609169696&sr=1-4-cc7a04fe-cc55-42ad-b883-1b910070c86a", "https://www.amazon.in/SportSoul-DBLV1-Vinyl-Dumbbell-Adult/dp/B01M8HJH1K/ref=sxin_10?ascsubtag=amzn1.osa.e2f6d9ce-6666-428f-8af9-c6ecec04f9e7.A21TJRUUN4KGV.en_IN&creativeASIN=B01M8HJH1K&cv_ct_cx=Dumbbells&cv_ct_id=amzn1.osa.e2f6d9ce-6666-428f-8af9-c6ecec04f9e7.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=Dumbbells&linkCode=oas&pd_rd_i=B01M8HJH1K&pd_rd_r=86d33c3c-cbbc-48db-ad33-73559fcd3150&pd_rd_w=eQcyh&pd_rd_wg=18brO&pf_rd_p=c2643bf4-911f-4931-9961-1c8e07844602&pf_rd_r=FK8P60V07V24SYDXD7JA&qid=1609169696&sr=1-1-483c64d8-df78-4008-ae20-e69f683e58b1&tag=firstpost1610-21"],
    "Home_Gym_Equipment": ["https://www.amazon.in/KORE-40KG-PVC-Combo-Home/dp/B072SM97M4/ref=sr_1_8?dchild=1&keywords=Home+Gym+Equipment&qid=1609169871&sr=8-8", "https://www.amazon.in/Kore-PVC-Home-Gym-Accessories/dp/B089DF1PXS/ref=sxin_9?ascsubtag=amzn1.osa.ac72107c-a88f-4326-98ed-5ed63a036964.A21TJRUUN4KGV.en_IN&creativeASIN=B089DF1PXS&cv_ct_cx=Home+Gym+Equipment&cv_ct_id=amzn1.osa.ac72107c-a88f-4326-98ed-5ed63a036964.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=Home+Gym+Equipment&linkCode=oas&pd_rd_i=B089DF1PXS&pd_rd_r=0a130413-9413-47e5-b138-b2ad5be4e3f2&pd_rd_w=s0U7S&pd_rd_wg=l3efx&pf_rd_p=c2643bf4-911f-4931-9961-1c8e07844602&pf_rd_r=RRNXPXK5EWQMJH1A04JY&qid=1609169871&sr=1-1-483c64d8-df78-4008-ae20-e69f683e58b1&tag=reviewsin-21", "https://www.amazon.in/AURION-PVC-Blue-Exercise-Dumbbells/dp/B07PG6NRFR/ref=sxin_9?ascsubtag=amzn1.osa.ac72107c-a88f-4326-98ed-5ed63a036964.A21TJRUUN4KGV.en_IN&creativeASIN=B07PG6NRFR&cv_ct_cx=Home+Gym+Equipment&cv_ct_id=amzn1.osa.ac72107c-a88f-4326-98ed-5ed63a036964.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=Home+Gym+Equipment&linkCode=oas&pd_rd_i=B07PG6NRFR&pd_rd_r=0a130413-9413-47e5-b138-b2ad5be4e3f2&pd_rd_w=s0U7S&pd_rd_wg=l3efx&pf_rd_p=c2643bf4-911f-4931-9961-1c8e07844602&pf_rd_r=RRNXPXK5EWQMJH1A04JY&qid=1609169871&sr=1-2-483c64d8-df78-4008-ae20-e69f683e58b1&tag=reviewsin-21", "https://www.amazon.in/PRO365-Double-Roller-Abdominal-Workout/dp/B07PP3LCLN/ref=sxin_9?ascsubtag=amzn1.osa.ac72107c-a88f-4326-98ed-5ed63a036964.A21TJRUUN4KGV.en_IN&creativeASIN=B07PP3LCLN&cv_ct_cx=Home+Gym+Equipment&cv_ct_id=amzn1.osa.ac72107c-a88f-4326-98ed-5ed63a036964.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=Home+Gym+Equipment&linkCode=oas&pd_rd_i=B07PP3LCLN&pd_rd_r=0a130413-9413-47e5-b138-b2ad5be4e3f2&pd_rd_w=s0U7S&pd_rd_wg=l3efx&pf_rd_p=c2643bf4-911f-4931-9961-1c8e07844602&pf_rd_r=RRNXPXK5EWQMJH1A04JY&qid=1609169871&sr=1-3-483c64d8-df78-4008-ae20-e69f683e58b1&tag=reviewsin-21", "https://www.amazon.in/V22-Equipments-Dumbbell-Accessories-2KGX2-16KG/dp/B08P8QZPQ1/ref=sr_1_10?dchild=1&keywords=Home+Gym+Equipment&qid=1609169871&sr=8-10", "https://www.amazon.in/RV-Equipments-Dumbbell-Straight-Accessories/dp/B08NX7RD7N/ref=sr_1_11?dchild=1&keywords=Home+Gym+Equipment&qid=1609169871&sr=8-11", "https://www.amazon.in/Aagna-Equipment-Push-ups-Assistant-Abdominal/dp/B08FTFXTL4/ref=sr_1_13?dchild=1&keywords=Home+Gym+Equipment&qid=1609169871&sr=8-13"],
    "Weight_Lifting_Shoes": ["https://www.amazon.in/PRO-ASE-White-Professional-Weightlifting/dp/B07ZJLLSD1/ref=sr_1_5?dchild=1&keywords=Weight+Lifting+Shoes&qid=1609170225&sr=8-5", "https://www.amazon.in/PRO-ASE-White-Professional-Weightlifting/dp/B07ZJLLSD1/ref=sr_1_5?dchild=1&keywords=Weight+Lifting+Shoes&qid=1609170225&sr=8-5", "https://www.amazon.in/Nivia-509RB06-Wrestling-Shoes-Youth/dp/B07DLXTNDD/ref=sr_1_7?dchild=1&keywords=Weight+Lifting+Shoes&qid=1609170225&sr=8-7", "https://www.amazon.in/Amazon-Brand-Symbol-Sneakers-9-AZ-SH-03E/dp/B07DJD4ZNR/ref=sr_1_11?dchild=1&keywords=Weight+Lifting+Shoes&qid=1609170225&sr=8-11", "https://www.amazon.in/Kobo-WTA-03-Power-Cotton-Support/dp/B010WVL7W6/ref=sr_1_12?dchild=1&keywords=Weight+Lifting+Shoes&qid=1609170225&sr=8-12"],
    "Weight_lifting_Belts": ["https://www.amazon.in/Pressurized-Weightlifting-Bodybuilding-Squatting-Supporting/dp/B07S6Z18D1/ref=sr_1_6?dchild=1&keywords=Weight+lifting+Belts&qid=1609170382&sr=8-6", "https://www.amazon.in/Genuine-Comfortable-Adjustable-Stabilizing-Weightlifting/dp/B085YBHSC7/ref=sr_1_7?dchild=1&keywords=Weight+lifting+Belts&qid=1609170382&sr=8-7", "https://www.amazon.in/Wide-Double-Thick-Gym-Weightlifting-Belt-Heavy-Core-Washable-Stabilizing/dp/B08KG3T7LN/ref=sr_1_8?dchild=1&keywords=Weight+lifting+Belts&qid=1609170382&sr=8-8", "https://www.amazon.in/AmazonBasics-Padded-Weight-Lifting-Large/dp/B07L4VS2KG/ref=sxin_9_pb_mod_primary_lightning_deal?cv_ct_cx=Weight+lifting+Belts&dchild=1&keywords=Weight+lifting+Belts&pd_rd_i=B07L4VS2KG&pd_rd_r=8cfc1c73-5477-41bb-bbaa-7a554ac33d08&pd_rd_w=XvQMr&pd_rd_wg=wc5J6&pf_rd_p=6fd88f24-e84e-4fb6-a393-3441855e4add&pf_rd_r=8ZQTWT5GCNF65QPT4X5F&qid=1609170382&sbo=Tc8eqSFhUl4VwMzbE4fw%2Fw%3D%3D&smid=AT95IG9ONZD7S&sr=1-1-cc7a04fe-cc55-42ad-b883-1b910070c86a", "https://www.amazon.in/Super-Belt-XL-Leather-Lifting-Support-X-Large/dp/B07NZPDVF9/ref=sxin_10?ascsubtag=amzn1.osa.e18971b9-cc03-4eda-b1ac-b36d48b3fa7d.A21TJRUUN4KGV.en_IN&creativeASIN=B07NZPDVF9&cv_ct_cx=Weight+lifting+Belts&cv_ct_id=amzn1.osa.e18971b9-cc03-4eda-b1ac-b36d48b3fa7d.A21TJRUUN4KGV.en_IN&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-earns-comm&dchild=1&keywords=Weight+lifting+Belts&linkCode=oas&pd_rd_i=B07NZPDVF9&pd_rd_r=8cfc1c73-5477-41bb-bbaa-7a554ac33d08&pd_rd_w=u57qM&pd_rd_wg=wc5J6&pf_rd_p=2e205f58-a178-467b-b158-e683757b4b34&pf_rd_r=8ZQTWT5GCNF65QPT4X5F&qid=1609170382&sr=1-2-483c64d8-df78-4008-ae20-e69f683e58b1&tag=toimsp-21"],
    "Workout_Headphones": ["https://www.amazon.in/Mivi-ThunderBeats-Wireless-Bluetooth-Earphones/dp/B07VNL73FF/ref=sr_1_6?dchild=1&keywords=Workout+Headphones&qid=1609170559&sr=8-6", "https://www.amazon.in/Sony-MDR-AS210-Open-Ear-Active-Headphones/dp/B01LW1IADQ/ref=sr_1_7?dchild=1&keywords=Workout+Headphones&qid=1609170559&sr=8-7", "https://www.amazon.in/JBL-Endurance-Wireless-Headphones-Yellow/dp/B07N7WMCZ6/ref=sr_1_8_mod_primary_lightning_deal?dchild=1&keywords=Workout+Headphones&qid=1609170559&sbo=Tc8eqSFhUl4VwMzbE4fw%2Fw%3D%3D&smid=A14CZOWI0VEHLG&sr=8-8", "https://www.amazon.in/255-Bluetooth-Wireless-Earphone-Immersive/dp/B07C2VJFDW/ref=sr_1_9?dchild=1&keywords=Workout+Headphones&qid=1609170559&sr=8-9", "https://www.amazon.in/Headphones-Bluetooth-Headband-Wireless-Detachable/dp/B08KDBQVNN/ref=sr_1_10?dchild=1&keywords=Workout+Headphones&qid=1609170559&sr=8-10", "https://www.amazon.in/Moonwalk-Mini-Bluetooth-Earphones-Indicator/dp/B08NB1YRW2/ref=sr_1_13_mod_primary_lightning_deal?dchild=1&keywords=Workout+Headphones&qid=1609170559&sbo=Tc8eqSFhUl4VwMzbE4fw%2Fw%3D%3D&smid=A14CZOWI0VEHLG&sr=8-13", "https://www.amazon.in/Rockerz-261-Sports-Wireless-Earphones/dp/B07KY3DLGZ/ref=sr_1_14?dchild=1&keywords=Workout+Headphones&qid=1609170559&sr=8-14"]

  }
  var pname = [];
  var price = [];
  var avg = [];



  var avg_price = 0;
  var count = 0
  var c = 0

  async function scrapePage(productURL, x, xx) {


    const html = await getHTML(productURL);
    var amazonPrice = await getAmazonPrice(html);

    amazonPrice = await amazonPrice.replace(",", '')

    amazonPrice = await amazonPrice.replace("₹&nbsp;", '')
    amazonPrice = parseFloat(amazonPrice);
    console.log(amazonPrice)
    console.log(`The price is ${amazonPrice}`);
    avg_price = avg_price + await amazonPrice

    if (amazonPrice !== null) {
      pname.push(x + String(xx));
      price.push(amazonPrice)
    }

    return avg_price;

  }
  const productslink = products[req.body.pro]
  console.log(typeof (req.body.pro), "body")
  for (var x in productslink) {
    c = c + 1;
    // try { }
    await scrapePage(productslink[x], req.body.pro, x);

    // catch 
    // {
    //   count = count + 1;
    //   console.log("could't get data");

    // }

  }
  console.log("done")

  while (true) {
    if (c === Object.keys(productslink).length) {
      // await res.status(200).send(().toString());
      var avgf = (avg_price) / ((Object.keys(productslink).length) - count);


      await res.json({ avg: avgf, pnames: pname, price: price })


      break;
    }
  }






}

module.exports = { scrap };
