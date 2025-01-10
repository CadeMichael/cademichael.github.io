import{s as ce,n as gs}from"./scheduler.DCuoqBTv.js";import{S as re,i as ye,e as p,s as a,H as y,n as Zs,c as o,k as i,f as t,m as u,l as c,g as l,d as n}from"./index.D7iiQ2wq.js";function ue($s){let r,ks='<ol class="toc-level toc-level-1"><li class="toc-item toc-item-h1"><a class="toc-link toc-link-h1" href="#ocaml-unit-tests-and-pre-processors-setup">Ocaml Unit Tests and Pre Processors setup</a><ol class="toc-level toc-level-2"><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#project-setup">Project setup</a></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#installation">Installation</a></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#dune-setup">Dune Setup</a><ol class="toc-level toc-level-3"><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#manual">Manual</a></li><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#using-dune-tooling">Using dune tooling</a></li></ol></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#declaring-tests">Declaring Tests</a><ol class="toc-level toc-level-3"><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#unit-tests">Unit Tests</a></li><li class="toc-item toc-item-h3"><a class="toc-link toc-link-h3" href="#unit-tests-with-printing">Unit Tests with Printing</a></li></ol></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#comparison-with-custom-types">Comparison with Custom Types</a></li><li class="toc-item toc-item-h2"><a class="toc-link toc-link-h2" href="#sneaky-issues-when-opening-base">Sneaky Issues when opening Base</a></li></ol></li></ol>',es,D,Ms='<a aria-hidden="true" tabindex="-1" href="#ocaml-unit-tests-and-pre-processors-setup"><span class="icon icon-link"></span></a>Ocaml Unit Tests and Pre Processors setup',ls,v,Ts="<li>After hearing a great talk about Ocaml at OPLSS (Oregon Programming Languages Summer School), I decided to explore the language.</li> <li>I have made several half hearted attemps to learn Ocaml but kept getting tripped up on the build system and project structure. There was just enough friction to keep me from enjoying the experience.</li> <li>My goal with this post is to make that process a little easier for anyone who has experienced the same things.</li>",ns,w,Hs="<strong>Goals</strong>",as,g,Ls='<li>go through <a href="https://ocaml.org/exercises" rel="nofollow">ocaml exercises</a></li> <li>have unit tests for each problem</li> <li>correctly set up a project with <a href="https://dune.readthedocs.io/en/stable/usage.html#initializing-a-library" rel="nofollow">dune</a></li> <li>Get set up with pre processors, I never fully grasped them in previous attempts</li>',ts,d,Cs='<a aria-hidden="true" tabindex="-1" href="#project-setup"><span class="icon icon-link"></span></a>Project setup',ps,k,Us=`<li>default dune project setup
<ul><li>I removed every directory except for the lib dir which I renamed to ‘test’.</li> <li>when using unit tests we have to use a library!</li></ul></li>`,os,S,se=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span>ocamlPrac</span></span>
<span class="line"><span>├── dune-project</span></span>
<span class="line"><span>├── simple-problems.opam</span></span>
<span class="line"><span>└── test</span></span>
<span class="line"><span>    ├── beginner.ml</span></span>
<span class="line"><span>    ├── beginner_test.ml</span></span>
<span class="line"><span>    ├── dune</span></span>
<span class="line"><span>    ├── intermediate.ml</span></span>
<span class="line"><span>    └── intermediate_test.ml</span></span></code></pre>`,P,A,js='<a aria-hidden="true" tabindex="-1" href="#installation"><span class="icon icon-link"></span></a>Installation',is,M,Os=`<li>it’s a bit of an exercise in patience finding what packages you need / don’t need for pre processing.
<ul><li>some packages install others as dependencies and or are part of the default opam setup.</li> <li>I found that this combination of packages insures that you have everything that you need.</li></ul></li>`,cs,I,ee=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#A9B665">opam</span><span style="color:#D8A657"> isntall</span><span style="color:#D8A657"> ppx_inline_test</span><span style="color:#D8A657"> ppx_assert</span><span style="color:#D8A657"> ppx_sexp</span><span style="color:#D8A657"> ppx_compare</span><span style="color:#D8A657"> ppx_deriving</span></span>
<span class="line"><span style="color:#928374;font-style:italic"># if you want to print test results</span></span>
<span class="line"><span style="color:#A9B665">opam</span><span style="color:#D8A657"> install</span><span style="color:#D8A657"> ppx_expect</span><span style="color:#D8A657"> core</span></span></code></pre>`,z,h,qs='<a aria-hidden="true" tabindex="-1" href="#dune-setup"><span class="icon icon-link"></span></a>Dune Setup',rs,B,Ss='<a aria-hidden="true" tabindex="-1" href="#manual"><span class="icon icon-link"></span></a>Manual',ys,T,Ps=`<li>You can set you dune file manually. this file is in your <strong>executable</strong> or <strong>library</strong> directory, and is named <code>dune</code>.</li> <li>For the testing pre processors we need to be working in a library / executable. This means we can’t use the default <em>dune</em> test dir. My directory is named test but it is not the default test dir.
<ul><li>you also need <code>(inline_tests)</code> to tell dune that you have unit tests in your library.</li> <li>we have all of the pre processors passed into <code>pps</code> <ul><li>inline_tests -&gt; testing</li> <li>ppx_assert -&gt; better unit test syntax</li> <li>sexp_conv -&gt; handling custom types</li> <li>compare -&gt; comparing equality of custom types</li> <li>ppx_expect -&gt; optional if you want to print tests, to print sexp (lists etc) you will also need <code>core</code> and have to open it in your test file.</li> <li><strong>ppx_jane</strong> -&gt; if you want to keep things simple just use this as a pps. You need the other packages installed but this pps references all of them. This was the only method that I found to work for <strong>expect tests with sexp printing</strong></li></ul></li></ul></li>`,us,F,le=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span>(library</span></span>
<span class="line"><span> (name simple_prac)</span></span>
<span class="line"><span> (libraries base stdio)</span></span>
<span class="line"><span> (inline_tests)</span></span>
<span class="line"><span> (preprocess</span></span>
<span class="line"><span>  (pps ppx_inline_test ppx_assert ppx_sexp_conv ppx_compare)))</span></span>
<span class="line"><span>  ; for simplicity you can do this instead</span></span>
<span class="line"><span>  (pps ppx_jane)</span></span></code></pre>`,G,m,Is='<a aria-hidden="true" tabindex="-1" href="#using-dune-tooling"><span class="icon icon-link"></span></a>Using dune tooling',Ds,H,zs='<li>as per the <a href="https://dune.readthedocs.io/en/stable/usage.html#initializing-a-library" rel="nofollow">dune</a> we can pass parameters into <code>dune init lib</code></li> <li>the following should give us a similar setup to the manual one above</li> <li>we separate the libs and ppx we need with ’,’ and no spaces</li>',ds,N,ne=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#A9B665">%</span><span style="color:#D8A657"> dune</span><span style="color:#D8A657"> init</span><span style="color:#D8A657"> lib</span><span style="color:#D8A657"> mylib</span><span style="color:#D8A657"> src</span><span style="color:#D8A657"> --libs</span><span style="color:#D8A657"> base,stdio</span><span style="color:#D8A657">  --inline-tests</span><span style="color:#D8A657"> --ppx</span><span style="color:#D8A657"> ppx_assert,ppx_sexp_conv,ppx_compare</span></span>
<span class="line"><span style="color:#A9B665">Success:</span><span style="color:#D8A657"> initialized</span><span style="color:#D8A657"> library</span><span style="color:#D8A657"> component</span><span style="color:#D8A657"> named</span><span style="color:#D8A657"> mylib</span></span></code></pre>`,Y,f,Fs='<a aria-hidden="true" tabindex="-1" href="#declaring-tests"><span class="icon icon-link"></span></a>Declaring Tests',As,b,Gs='<a aria-hidden="true" tabindex="-1" href="#unit-tests"><span class="icon icon-link"></span></a>Unit Tests',hs,L,Ns=`<li>Start with <code>let%test_unit &quot;&lt;testname&gt;&quot; =</code> <ul><li>you declare the testname in a string</li> <li>for each unit test define it with
<ul><li><code>[%test_eq: &lt;return type&gt;] (&lt;function input&gt;) &lt;expected output&gt;</code></li> <li>you must know the type you are expecting from the function being tested</li></ul></li> <li>separate each test_eq with a <code>;</code></li></ul></li> <li>run all tests with <code>dune runtest</code> <ul><li>unfortunately it only prints when tests fail, if there is no output tests have passed</li></ul></li>`,Bs,V,ae=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#EA6962">let</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">test_unit </span><span style="color:#D8A657">"last"</span><span style="color:#7DAEA3"> =</span></span>
<span class="line"><span style="color:#D8A657">  [</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">test_eq</span><span style="color:#D8A657">:</span><span style="color:#D4BE98"> string </span><span style="color:#A9B665">option</span><span style="color:#D8A657">]</span><span style="color:#D4BE98"> (last </span><span style="color:#D8A657">[</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "b";</span><span style="color:#D8A657"> "c"</span><span style="color:#D8A657"> ]</span><span style="color:#D4BE98">) (</span><span style="color:#D8A657">Some</span><span style="color:#D8A657"> "c"</span><span style="color:#D4BE98">)</span><span style="color:#D8A657">;</span></span>
<span class="line"><span style="color:#D8A657">  [</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">test_eq</span><span style="color:#D8A657">:</span><span style="color:#D4BE98"> string </span><span style="color:#A9B665">option</span><span style="color:#D8A657">]</span><span style="color:#D4BE98"> (last </span><span style="color:#D8A657">[]</span><span style="color:#D4BE98">) </span><span style="color:#D8A657">None</span></span></code></pre>`,W,E,Ys='<a aria-hidden="true" tabindex="-1" href="#unit-tests-with-printing"><span class="icon icon-link"></span></a>Unit Tests with Printing',ms,C,Vs="<li>if you want ‘prettier’ tests where your error messages make a bit more sense there is <strong>ppx_expect</strong>, which provides <code>%expect_test</code></li>",fs,J,te=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#928374;font-weight:bold">(* standard unit test*)</span></span>
<span class="line"><span style="color:#EA6962">let</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">test_unit </span><span style="color:#D8A657">"encode 2"</span><span style="color:#7DAEA3"> =</span></span>
<span class="line"><span style="color:#D8A657">  [</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">test_eq</span><span style="color:#D8A657">:</span><span style="color:#D4BE98"> string </span><span style="color:#A9B665">rle</span><span style="color:#D4BE98"> list</span><span style="color:#D8A657">]</span></span>
<span class="line"><span style="color:#D4BE98">    (encode_cst</span></span>
<span class="line"><span style="color:#928374;font-weight:bold">       (* change the first char to 'e' to break the test *)</span></span>
<span class="line"><span style="color:#D8A657">       [</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "b";</span><span style="color:#D8A657"> "c";</span><span style="color:#D8A657"> "c";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "d";</span><span style="color:#D8A657"> "e";</span><span style="color:#D8A657"> "e";</span><span style="color:#D8A657"> "e";</span><span style="color:#D8A657"> "e"</span><span style="color:#D8A657"> ]</span><span style="color:#D4BE98">)</span></span>
<span class="line"><span style="color:#D8A657">    [</span></span>
<span class="line"><span style="color:#D8A657">      Many</span><span style="color:#D4BE98"> (</span><span style="color:#D3869B">4</span><span style="color:#D8A657">,</span><span style="color:#D8A657"> "a"</span><span style="color:#D4BE98">)</span><span style="color:#D8A657">;</span></span>
<span class="line"><span style="color:#D8A657">      One</span><span style="color:#D8A657"> "b";</span></span>
<span class="line"><span style="color:#D8A657">      Many</span><span style="color:#D4BE98"> (</span><span style="color:#D3869B">2</span><span style="color:#D8A657">,</span><span style="color:#D8A657"> "c"</span><span style="color:#D4BE98">)</span><span style="color:#D8A657">;</span></span>
<span class="line"><span style="color:#D8A657">      Many</span><span style="color:#D4BE98"> (</span><span style="color:#D3869B">2</span><span style="color:#D8A657">,</span><span style="color:#D8A657"> "a"</span><span style="color:#D4BE98">)</span><span style="color:#D8A657">;</span></span>
<span class="line"><span style="color:#D8A657">      One</span><span style="color:#D8A657"> "d";</span></span>
<span class="line"><span style="color:#D8A657">      Many</span><span style="color:#D4BE98"> (</span><span style="color:#D3869B">4</span><span style="color:#D8A657">,</span><span style="color:#D8A657"> "e"</span><span style="color:#D4BE98">)</span><span style="color:#D8A657">;</span></span>
<span class="line"><span style="color:#D8A657">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#928374;font-weight:bold">(*expect test*)</span></span>
<span class="line"><span style="color:#EA6962">let</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">expect_test </span><span style="color:#D8A657">"printing encode"</span><span style="color:#7DAEA3"> =</span></span>
<span class="line"><span style="color:#D4BE98">  print_s</span></span>
<span class="line"><span style="color:#D8A657">    [</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">sexp </span><span style="color:#928374;font-weight:bold">(* needed to decompose the type into a sexp for comparison *)</span></span>
<span class="line"><span style="color:#D4BE98">      (encode_cst</span></span>
<span class="line"><span style="color:#D8A657">         [</span><span style="color:#928374;font-weight:bold"> (* change the first char to 'e' to break the test *)</span></span>
<span class="line"><span style="color:#D8A657">           "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "b";</span><span style="color:#D8A657"> "c";</span><span style="color:#D8A657"> "c";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "a";</span><span style="color:#D8A657"> "d";</span><span style="color:#D8A657"> "e";</span><span style="color:#D8A657"> "e";</span><span style="color:#D8A657"> "e";</span><span style="color:#D8A657"> "e";</span></span>
<span class="line"><span style="color:#D8A657">         ]</span></span>
<span class="line"><span style="color:#D8A657">        :</span><span style="color:#D4BE98"> string rle list)</span><span style="color:#D8A657">]</span><span style="color:#D8A657">;</span></span>
<span class="line"><span style="color:#D8A657">  [</span><span style="color:#D8A657">%</span><span style="color:#D4BE98">expect </span><span style="color:#D8A657">&#123;|((Many 4 a) (One b) (Many 2 c) (Many 2 a) (One d) (Many 4 e))|&#125;</span><span style="color:#D8A657">]</span></span></code></pre>`,K,U,Ws="<li>the <code>expect_test</code> will output the following when it errs out</li>",bs,Q,pe=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#A9B665">%</span><span style="color:#D8A657"> dune</span><span style="color:#D8A657"> runtest</span></span>
<span class="line"><span style="color:#A9B665">File</span><span style="color:#A9B665"> "test/intermediate_test.ml"</span><span style="color:#D8A657">,</span><span style="color:#D8A657"> line</span><span style="color:#D8A657"> 1,</span><span style="color:#D8A657"> characters</span><span style="color:#D8A657"> 0-0:</span></span>
<span class="line"><span style="color:#A9B665">diff</span><span style="color:#D8A657"> --git</span><span style="color:#D8A657"> a/_build/default/test/intermediate_test.ml</span><span style="color:#D8A657"> b/_build/.sandbox/141cb4797c2cd634cf1d3e660f76</span></span>
<span class="line"><span style="color:#A9B665">0165/default/test/intermediate_test.ml.corrected</span></span>
<span class="line"><span style="color:#A9B665">index</span><span style="color:#D8A657"> 06b2779..bde5973</span><span style="color:#D3869B"> 100644</span></span>
<span class="line"><span style="color:#A9B665">---</span><span style="color:#D8A657"> a/_build/default/test/intermediate_test.ml</span></span>
<span class="line"><span style="color:#A9B665">+++</span><span style="color:#D8A657"> b/_build/.sandbox/141cb4797c2cd634cf1d3e660f760165/default/test/intermediate_test.ml.corrected</span></span>
<span class="line"><span style="color:#A9B665">@@</span><span style="color:#D8A657"> -81,4</span><span style="color:#D8A657"> +81,4</span><span style="color:#D8A657"> @@</span><span style="color:#D8A657"> let%expect_test</span><span style="color:#A9B665"> "printing encode"</span><span style="color:#D8A657"> =</span></span>
<span class="line"><span style="color:#A9B665">            "a"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"a"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"a"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"a"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"b"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"c"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"c"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"a"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"a"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"d"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"e"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"e"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"e"</span><span style="color:#D4BE98">; </span><span style="color:#A9B665">"e"</span><span style="color:#D4BE98">;</span></span>
<span class="line"><span style="color:#D4BE98">          ]</span></span>
<span class="line"><span style="color:#D8A657">         :</span><span style="color:#D8A657"> string</span><span style="color:#D8A657"> rle</span><span style="color:#D8A657"> list</span><span style="color:#D4BE98">)];</span></span>
<span class="line"><span style="color:#A9B665">-</span><span style="color:#D4BE98">  [%expect </span><span style="color:#D8A657">&#123;</span><span style="color:#E78A4E">|</span><span style="color:#D4BE98">((</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 4</span><span style="color:#D3869B"> e</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">One</span><span style="color:#D3869B"> b</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 2</span><span style="color:#D3869B"> c</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 2</span><span style="color:#D3869B"> a</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">One</span><span style="color:#D3869B"> d</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 4</span><span style="color:#D3869B"> e</span><span style="color:#D4BE98">))</span><span style="color:#E78A4E">|</span><span style="color:#D4BE98">&#125;]</span></span>
<span class="line"><span style="color:#A9B665">+</span><span style="color:#D4BE98">  [%expect </span><span style="color:#D8A657">&#123;</span><span style="color:#E78A4E">|</span><span style="color:#D4BE98"> ((</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 4</span><span style="color:#D3869B"> a</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">One</span><span style="color:#D3869B"> b</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 2</span><span style="color:#D3869B"> c</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 2</span><span style="color:#D3869B"> a</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">One</span><span style="color:#D3869B"> d</span><span style="color:#D4BE98">) (</span><span style="color:#D3869B">Many</span><span style="color:#D3869B"> 4</span><span style="color:#D3869B"> e</span><span style="color:#D4BE98">)) </span><span style="color:#E78A4E">|</span><span style="color:#D4BE98">&#125;]</span></span></code></pre>`,R,x,Js='<a aria-hidden="true" tabindex="-1" href="#comparison-with-custom-types"><span class="icon icon-link"></span></a>Comparison with Custom Types',Es,j,Ks="<li>in order to compare complex types we need to have <code>[@@deriving sexp, compare]</code> <ul><li>sexp allows the type de be decomposed into S-expressions.</li> <li>compare allows instances of the type to be comared with eachother.</li></ul></li>",xs,X,oe=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#EA6962">type</span><span style="color:#D4BE98"> '</span><span style="color:#EA6962">a</span><span style="color:#A9B665"> rle</span><span style="color:#7DAEA3"> =</span><span style="color:#D8A657"> One</span><span style="color:#D4BE98"> of </span><span style="color:#D4BE98">'</span><span style="color:#EA6962">a</span><span style="color:#7DAEA3"> |</span><span style="color:#D8A657"> Many</span><span style="color:#D4BE98"> of int </span><span style="color:#D8A657">*</span><span style="color:#D4BE98"> '</span><span style="color:#EA6962">a</span><span style="color:#D8A657"> [</span><span style="color:#D8A657">@@</span><span style="color:#D4BE98">deriving compare</span><span style="color:#D8A657">,</span><span style="color:#D4BE98"> sexp</span><span style="color:#D8A657">]</span></span></code></pre>`,Z,O,Qs="<li>for the practice problems from the ocaml website we will need to add these decorators in order to write unit tests.</li>",_s,_,Rs='<a aria-hidden="true" tabindex="-1" href="#sneaky-issues-when-opening-base"><span class="icon icon-link"></span></a>Sneaky Issues when opening Base',vs,q,Xs=`<li>when opening base you override some std lib functions. When going though the ocaml exercises and their solutions this becomes extremely apparent when trying to use <code>=</code>.
<ul><li>the std lib <code>=</code> can compare ints, strings, lists, etc…</li> <li>when opening Base, it will only compare ints. This means you will have to use type specific equality functions.</li></ul></li>`,ws,$,ie=`<pre class="shiki gruvbox" style="background-color:#292828;color:#d4be98" tabindex="0"><code><span class="line"><span style="color:#D4BE98">utop # #require </span><span style="color:#D8A657">"base"</span><span style="color:#D4BE98">;;</span></span>
<span class="line"><span style="color:#D4BE98">utop # </span><span style="color:#D8A657">open</span><span style="color:#D3869B"> Base</span><span style="color:#D4BE98">;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4BE98">utop # </span><span style="color:#D3869B">1</span><span style="color:#D4BE98"> = </span><span style="color:#D3869B">1</span><span style="color:#D4BE98">;; </span><span style="color:#928374;font-weight:bold">(* works fine with ints *)</span></span>
<span class="line"><span style="color:#D4BE98">- : bool/2 = true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4BE98">utop # </span><span style="color:#D8A657">"a"</span><span style="color:#D4BE98"> = </span><span style="color:#D8A657">"a"</span><span style="color:#D4BE98">;; </span><span style="color:#928374;font-weight:bold">(* does not work with strings *)</span></span>
<span class="line"><span style="color:#D4BE98">Error: This expression has </span><span style="color:#EA6962">type</span><span style="color:#A9B665"> string</span><span style="color:#D8A657">/</span><span style="color:#D4BE98">2 </span><span style="color:#A9B665">but</span><span style="color:#A9B665"> an</span><span style="color:#A9B665"> expression</span><span style="color:#A9B665"> was</span><span style="color:#A9B665"> expected</span><span style="color:#D4BE98"> of </span><span style="color:#EA6962">type</span></span>
<span class="line"><span style="color:#A9B665">         int</span><span style="color:#D8A657">/</span><span style="color:#D4BE98">2</span></span>
<span class="line"><span style="color:#D4BE98">       File "</span><span style="color:#A9B665">_none_</span><span style="color:#D4BE98">"</span><span style="color:#D8A657">,</span><span style="color:#A9B665"> line</span><span style="color:#D4BE98"> 1</span><span style="color:#D8A657">:</span></span>
<span class="line"><span style="color:#D4BE98">         Definition of </span><span style="color:#EA6962">type</span><span style="color:#A9B665"> int</span><span style="color:#D8A657">/</span><span style="color:#D4BE98">2</span></span>
<span class="line"><span style="color:#D4BE98">       File "</span><span style="color:#A9B665">_none_</span><span style="color:#D4BE98">"</span><span style="color:#D8A657">,</span><span style="color:#A9B665"> line</span><span style="color:#D4BE98"> 1</span><span style="color:#D8A657">:</span></span>
<span class="line"><span style="color:#D4BE98">         Definition of </span><span style="color:#EA6962">type</span><span style="color:#A9B665"> string</span><span style="color:#D8A657">/</span><span style="color:#D4BE98">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A9B665">utop</span><span style="color:#D8A657"> #</span><span style="color:#D3869B"> String</span><span style="color:#EA6962">.</span><span style="color:#A9B665">equal</span><span style="color:#D4BE98"> "</span><span style="color:#A9B665">a</span><span style="color:#D4BE98">" "</span><span style="color:#A9B665">a</span><span style="color:#D4BE98">";;</span></span>
<span class="line"><span style="color:#D4BE98">- : bool/2 = true</span></span></code></pre>`,ss;return{c(){r=p("nav"),r.innerHTML=ks,es=a(),D=p("h1"),D.innerHTML=Ms,ls=a(),v=p("ul"),v.innerHTML=Ts,ns=a(),w=p("p"),w.innerHTML=Hs,as=a(),g=p("ol"),g.innerHTML=Ls,ts=a(),d=p("h2"),d.innerHTML=Cs,ps=a(),k=p("ul"),k.innerHTML=Us,os=a(),S=new y(!1),P=a(),A=p("h2"),A.innerHTML=js,is=a(),M=p("ul"),M.innerHTML=Os,cs=a(),I=new y(!1),z=a(),h=p("h2"),h.innerHTML=qs,rs=a(),B=p("h3"),B.innerHTML=Ss,ys=a(),T=p("ul"),T.innerHTML=Ps,us=a(),F=new y(!1),G=a(),m=p("h3"),m.innerHTML=Is,Ds=a(),H=p("ul"),H.innerHTML=zs,ds=a(),N=new y(!1),Y=a(),f=p("h2"),f.innerHTML=Fs,As=a(),b=p("h3"),b.innerHTML=Gs,hs=a(),L=p("ul"),L.innerHTML=Ns,Bs=a(),V=new y(!1),W=a(),E=p("h3"),E.innerHTML=Ys,ms=a(),C=p("ul"),C.innerHTML=Vs,fs=a(),J=new y(!1),K=a(),U=p("ul"),U.innerHTML=Ws,bs=a(),Q=new y(!1),R=a(),x=p("h2"),x.innerHTML=Js,Es=a(),j=p("ul"),j.innerHTML=Ks,xs=a(),X=new y(!1),Z=a(),O=p("ul"),O.innerHTML=Qs,_s=a(),_=p("h2"),_.innerHTML=Rs,vs=a(),q=p("ul"),q.innerHTML=Xs,ws=a(),$=new y(!1),ss=Zs(),this.h()},l(s){r=o(s,"NAV",{class:!0,"data-svelte-h":!0}),i(r)!=="svelte-xb5dg7"&&(r.innerHTML=ks),es=t(s),D=o(s,"H1",{id:!0,"data-svelte-h":!0}),i(D)!=="svelte-17z0937"&&(D.innerHTML=Ms),ls=t(s),v=o(s,"UL",{"data-svelte-h":!0}),i(v)!=="svelte-qvrdut"&&(v.innerHTML=Ts),ns=t(s),w=o(s,"P",{"data-svelte-h":!0}),i(w)!=="svelte-e9pxhl"&&(w.innerHTML=Hs),as=t(s),g=o(s,"OL",{"data-svelte-h":!0}),i(g)!=="svelte-1gjjot9"&&(g.innerHTML=Ls),ts=t(s),d=o(s,"H2",{id:!0,"data-svelte-h":!0}),i(d)!=="svelte-1nz12ui"&&(d.innerHTML=Cs),ps=t(s),k=o(s,"UL",{"data-svelte-h":!0}),i(k)!=="svelte-1ir0tj9"&&(k.innerHTML=Us),os=t(s),S=u(s,!1),P=t(s),A=o(s,"H2",{id:!0,"data-svelte-h":!0}),i(A)!=="svelte-b9folw"&&(A.innerHTML=js),is=t(s),M=o(s,"UL",{"data-svelte-h":!0}),i(M)!=="svelte-1lmkewz"&&(M.innerHTML=Os),cs=t(s),I=u(s,!1),z=t(s),h=o(s,"H2",{id:!0,"data-svelte-h":!0}),i(h)!=="svelte-11t6zgl"&&(h.innerHTML=qs),rs=t(s),B=o(s,"H3",{id:!0,"data-svelte-h":!0}),i(B)!=="svelte-114ew6u"&&(B.innerHTML=Ss),ys=t(s),T=o(s,"UL",{"data-svelte-h":!0}),i(T)!=="svelte-16joe2o"&&(T.innerHTML=Ps),us=t(s),F=u(s,!1),G=t(s),m=o(s,"H3",{id:!0,"data-svelte-h":!0}),i(m)!=="svelte-5zqqnc"&&(m.innerHTML=Is),Ds=t(s),H=o(s,"UL",{"data-svelte-h":!0}),i(H)!=="svelte-1hl0dir"&&(H.innerHTML=zs),ds=t(s),N=u(s,!1),Y=t(s),f=o(s,"H2",{id:!0,"data-svelte-h":!0}),i(f)!=="svelte-10k95ni"&&(f.innerHTML=Fs),As=t(s),b=o(s,"H3",{id:!0,"data-svelte-h":!0}),i(b)!=="svelte-1ehzmx9"&&(b.innerHTML=Gs),hs=t(s),L=o(s,"UL",{"data-svelte-h":!0}),i(L)!=="svelte-1vyj2uc"&&(L.innerHTML=Ns),Bs=t(s),V=u(s,!1),W=t(s),E=o(s,"H3",{id:!0,"data-svelte-h":!0}),i(E)!=="svelte-127e860"&&(E.innerHTML=Ys),ms=t(s),C=o(s,"UL",{"data-svelte-h":!0}),i(C)!=="svelte-w8tbcn"&&(C.innerHTML=Vs),fs=t(s),J=u(s,!1),K=t(s),U=o(s,"UL",{"data-svelte-h":!0}),i(U)!=="svelte-1pos4il"&&(U.innerHTML=Ws),bs=t(s),Q=u(s,!1),R=t(s),x=o(s,"H2",{id:!0,"data-svelte-h":!0}),i(x)!=="svelte-1hofp09"&&(x.innerHTML=Js),Es=t(s),j=o(s,"UL",{"data-svelte-h":!0}),i(j)!=="svelte-1guvqkd"&&(j.innerHTML=Ks),xs=t(s),X=u(s,!1),Z=t(s),O=o(s,"UL",{"data-svelte-h":!0}),i(O)!=="svelte-1gcrvyh"&&(O.innerHTML=Qs),_s=t(s),_=o(s,"H2",{id:!0,"data-svelte-h":!0}),i(_)!=="svelte-cy2ekq"&&(_.innerHTML=Rs),vs=t(s),q=o(s,"UL",{"data-svelte-h":!0}),i(q)!=="svelte-k462rc"&&(q.innerHTML=Xs),ws=t(s),$=u(s,!1),ss=Zs(),this.h()},h(){c(r,"class","toc"),c(D,"id","ocaml-unit-tests-and-pre-processors-setup"),c(d,"id","project-setup"),S.a=P,c(A,"id","installation"),I.a=z,c(h,"id","dune-setup"),c(B,"id","manual"),F.a=G,c(m,"id","using-dune-tooling"),N.a=Y,c(f,"id","declaring-tests"),c(b,"id","unit-tests"),V.a=W,c(E,"id","unit-tests-with-printing"),J.a=K,Q.a=R,c(x,"id","comparison-with-custom-types"),X.a=Z,c(_,"id","sneaky-issues-when-opening-base"),$.a=ss},m(s,e){l(s,r,e),l(s,es,e),l(s,D,e),l(s,ls,e),l(s,v,e),l(s,ns,e),l(s,w,e),l(s,as,e),l(s,g,e),l(s,ts,e),l(s,d,e),l(s,ps,e),l(s,k,e),l(s,os,e),S.m(se,s,e),l(s,P,e),l(s,A,e),l(s,is,e),l(s,M,e),l(s,cs,e),I.m(ee,s,e),l(s,z,e),l(s,h,e),l(s,rs,e),l(s,B,e),l(s,ys,e),l(s,T,e),l(s,us,e),F.m(le,s,e),l(s,G,e),l(s,m,e),l(s,Ds,e),l(s,H,e),l(s,ds,e),N.m(ne,s,e),l(s,Y,e),l(s,f,e),l(s,As,e),l(s,b,e),l(s,hs,e),l(s,L,e),l(s,Bs,e),V.m(ae,s,e),l(s,W,e),l(s,E,e),l(s,ms,e),l(s,C,e),l(s,fs,e),J.m(te,s,e),l(s,K,e),l(s,U,e),l(s,bs,e),Q.m(pe,s,e),l(s,R,e),l(s,x,e),l(s,Es,e),l(s,j,e),l(s,xs,e),X.m(oe,s,e),l(s,Z,e),l(s,O,e),l(s,_s,e),l(s,_,e),l(s,vs,e),l(s,q,e),l(s,ws,e),$.m(ie,s,e),l(s,ss,e)},p:gs,i:gs,o:gs,d(s){s&&(n(r),n(es),n(D),n(ls),n(v),n(ns),n(w),n(as),n(g),n(ts),n(d),n(ps),n(k),n(os),S.d(),n(P),n(A),n(is),n(M),n(cs),I.d(),n(z),n(h),n(rs),n(B),n(ys),n(T),n(us),F.d(),n(G),n(m),n(Ds),n(H),n(ds),N.d(),n(Y),n(f),n(As),n(b),n(hs),n(L),n(Bs),V.d(),n(W),n(E),n(ms),n(C),n(fs),J.d(),n(K),n(U),n(bs),Q.d(),n(R),n(x),n(Es),n(j),n(xs),X.d(),n(Z),n(O),n(_s),n(_),n(vs),n(q),n(ws),n(ss),$.d())}}}const Ae={title:"Setting up Ocaml with Unit Tests for Practice Problems",date:"06-10-24"};class he extends re{constructor(r){super(),ye(this,r,null,ue,ce,{})}}export{he as default,Ae as metadata};
