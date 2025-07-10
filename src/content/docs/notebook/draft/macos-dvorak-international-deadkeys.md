---
title: 
description: 
date: 
tableOfContents:
  minHeadingLevel: 4
  maxHeadingLevel: 5
---

first stop for new windows or linux installs to use the dvorak keybaord layout iwth international deadkeys
https://arjenvankol.com/dvorak.php

but mac is left out 

this post has a ukelele layout setup 
https://www.reddit.com/r/dvorak/comments/im5amn/created_a_dvorak_international_layout_for_macos/


Put the file name 'Dvorak International Q⌘.keylayout'
in this folder '/Library/Keyboard Layouts'

Mac has a scary message warning of developer reading all your keytypes. 

But when looking through the code.


<?xml version="1.1" encoding="UTF-8"?>
<!DOCTYPE keyboard SYSTEM "file://localhost/System/Library/DTDs/KeyboardLayout.dtd">
<!--Created by Ukelele version 3.4.2.314 on 2020-09-03 at 18:36 (CDT)-->
<!--Last edited by Ukelele version 3.4.2.314 on 2020-09-03 at 18:42 (CDT)-->
<keyboard group="126" id="-3748" name="Dvorak International Q⌘" maxout="1">
    <layouts>
        <layout first="0" last="17" mapSet="ANSI" modifiers="Modifiers"/>
        <layout first="18" last="18" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="21" last="23" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="30" last="30" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="33" last="33" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="36" last="36" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="194" last="194" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="197" last="197" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="200" last="201" mapSet="JIS" modifiers="Modifiers"/>
        <layout first="206" last="207" mapSet="JIS" modifiers="Modifiers"/>
    </layouts>
    <modifierMap id="Modifiers" defaultIndex="10">
        <keyMapSelect mapIndex="0">
            <modifier keys=""/>
        </keyMapSelect>
        <keyMapSelect mapIndex="1">
            <modifier keys="anyShift"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="2">
            <modifier keys="anyOption"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="3">
            <modifier keys="anyShift caps? anyOption"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="4">
            <modifier keys="caps"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="5">
            <modifier keys="command"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="6">
            <modifier keys="anyShift command"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="7">
            <modifier keys="anyOption command"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="8">
            <modifier keys="anyShift anyOption command"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="9">
            <modifier keys="caps command"/>
        </keyMapSelect>
        <keyMapSelect mapIndex="10">
            <modifier keys="anyControl"/>
        </keyMapSelect>
    </modifierMap>
    <keyMapSet id="ANSI">
        <keyMap index="0">
            <key code="0" action="a"/>
            <key code="1" action="o"/>
            <key code="2" action="e"/>
            <key code="3" action="u"/>
            <key code="4" output="d"/>
            <key code="5" action="i"/>
            <key code="6" output=";"/>
            <key code="7" output="q"/>
            <key code="8" output="j"/>
            <key code="9" output="k"/>
            <key code="11" output="x"/>
            <key code="12" action="&#x0027;"/>
            <key code="13" output=","/>
            <key code="14" output="."/>
            <key code="15" output="p"/>
            <key code="16" output="f"/>
            <key code="17" action="y"/>
            <key code="18" output="1"/>
            <key code="19" output="2"/>
            <key code="20" output="3"/>
            <key code="21" output="4"/>
            <key code="22" output="6"/>
            <key code="23" output="5"/>
            <key code="24" output="]"/>
            <key code="25" output="9"/>
            <key code="26" output="7"/>
            <key code="27" output="["/>
            <key code="28" output="8"/>
            <key code="29" output="0"/>
            <key code="30" output="="/>
            <key code="31" output="r"/>
            <key code="32" output="g"/>
            <key code="33" output="/"/>
            <key code="34" action="c"/>
            <key code="35" output="l"/>
            <key code="36" output="&#x000D;"/>
            <key code="37" action="n"/>
            <key code="38" output="h"/>
            <key code="39" output="-"/>
            <key code="40" output="t"/>
            <key code="41" output="s"/>
            <key code="42" output="\"/>
            <key code="43" output="w"/>
            <key code="44" output="z"/>
            <key code="45" output="b"/>
            <key code="46" output="m"/>
            <key code="47" output="v"/>
            <key code="48" output="&#x0009;"/>
            <key code="49" action=" "/>
            <key code="50" action="`"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="67" output="*"/>
            <key code="69" output="+"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="75" output="/"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="78" output="-"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="81" output="="/>
            <key code="82" output="0"/>
            <key code="83" output="1"/>
            <key code="84" output="2"/>
            <key code="85" output="3"/>
            <key code="86" output="4"/>
            <key code="87" output="5"/>
            <key code="88" output="6"/>
            <key code="89" output="7"/>
            <key code="91" output="8"/>
            <key code="92" output="9"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="1">
            <key code="0" action="A"/>
            <key code="1" action="O"/>
            <key code="2" action="E"/>
            <key code="3" action="U"/>
            <key code="4" output="D"/>
            <key code="5" action="I"/>
            <key code="6" output=":"/>
            <key code="7" output="Q"/>
            <key code="8" output="J"/>
            <key code="9" output="K"/>
            <key code="11" output="X"/>
            <key code="12" action="&#x0022;"/>
            <key code="13" output="&#x003C;"/>
            <key code="14" output="&#x003E;"/>
            <key code="15" output="P"/>
            <key code="16" output="F"/>
            <key code="17" action="Y"/>
            <key code="18" output="!"/>
            <key code="19" output="@"/>
            <key code="20" output="#"/>
            <key code="21" output="$"/>
            <key code="22" action="^"/>
            <key code="23" output="%"/>
            <key code="24" output="}"/>
            <key code="25" output="("/>
            <key code="26" output="&#x0026;"/>
            <key code="27" output="{"/>
            <key code="28" output="*"/>
            <key code="29" output=")"/>
            <key code="30" output="+"/>
            <key code="31" output="R"/>
            <key code="32" output="G"/>
            <key code="33" output="?"/>
            <key code="34" action="C"/>
            <key code="35" output="L"/>
            <key code="36" output="&#x000D;"/>
            <key code="37" action="N"/>
            <key code="38" output="H"/>
            <key code="39" output="_"/>
            <key code="40" output="T"/>
            <key code="41" output="S"/>
            <key code="42" output="|"/>
            <key code="43" output="W"/>
            <key code="44" output="Z"/>
            <key code="45" output="B"/>
            <key code="46" output="M"/>
            <key code="47" output="V"/>
            <key code="48" output="&#x0009;"/>
            <key code="49" output=" "/>
            <key code="50" action="~"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="67" output="*"/>
            <key code="69" output="+"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="75" output="/"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="78" output="-"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="81" output="="/>
            <key code="82" output="0"/>
            <key code="83" output="1"/>
            <key code="84" output="2"/>
            <key code="85" output="3"/>
            <key code="86" output="4"/>
            <key code="87" output="5"/>
            <key code="88" output="6"/>
            <key code="89" output="7"/>
            <key code="91" output="8"/>
            <key code="92" output="9"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="2">
            <key code="0" output=""/>
            <key code="36" output="&#x000D;"/>
            <key code="48" output="&#x0009;"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="3">
            <key code="0" output=""/>
            <key code="36" output="&#x000D;"/>
            <key code="48" output="&#x0009;"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="4">
            <key code="0" output="A"/>
            <key code="1" output="O"/>
            <key code="2" output="E"/>
            <key code="3" output="U"/>
            <key code="4" output="D"/>
            <key code="5" output="I"/>
            <key code="6" output=";"/>
            <key code="7" output="Q"/>
            <key code="8" output="J"/>
            <key code="9" output="K"/>
            <key code="11" output="X"/>
            <key code="12" output="&#x0027;"/>
            <key code="13" output=","/>
            <key code="14" output="."/>
            <key code="15" output="P"/>
            <key code="16" output="F"/>
            <key code="17" output="Y"/>
            <key code="18" output="1"/>
            <key code="19" output="2"/>
            <key code="20" output="3"/>
            <key code="21" output="4"/>
            <key code="22" output="6"/>
            <key code="23" output="5"/>
            <key code="24" output="]"/>
            <key code="25" output="9"/>
            <key code="26" output="7"/>
            <key code="27" output="["/>
            <key code="28" output="8"/>
            <key code="29" output="0"/>
            <key code="30" output="="/>
            <key code="31" output="R"/>
            <key code="32" output="G"/>
            <key code="33" output="/"/>
            <key code="34" output="C"/>
            <key code="35" output="L"/>
            <key code="36" output="&#x000D;"/>
            <key code="37" output="N"/>
            <key code="38" output="H"/>
            <key code="39" output="-"/>
            <key code="40" output="T"/>
            <key code="41" output="S"/>
            <key code="42" output="\"/>
            <key code="43" output="W"/>
            <key code="44" output="Z"/>
            <key code="45" output="B"/>
            <key code="46" output="M"/>
            <key code="47" output="V"/>
            <key code="48" output="&#x0009;"/>
            <key code="49" output=" "/>
            <key code="50" output="`"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="67" output="*"/>
            <key code="69" output="+"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="75" output="/"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="78" output="-"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="81" output="="/>
            <key code="82" output="0"/>
            <key code="83" output="1"/>
            <key code="84" output="2"/>
            <key code="85" output="3"/>
            <key code="86" output="4"/>
            <key code="87" output="5"/>
            <key code="88" output="6"/>
            <key code="89" output="7"/>
            <key code="91" output="8"/>
            <key code="92" output="9"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="5">
            <key code="0" output="a"/>
            <key code="1" output="s"/>
            <key code="2" output="d"/>
            <key code="3" output="f"/>
            <key code="4" output="h"/>
            <key code="5" output="g"/>
            <key code="6" output="z"/>
            <key code="7" output="x"/>
            <key code="8" output="c"/>
            <key code="9" output="v"/>
            <key code="11" output="b"/>
            <key code="12" output="q"/>
            <key code="13" output="w"/>
            <key code="14" output="e"/>
            <key code="15" output="r"/>
            <key code="16" output="y"/>
            <key code="17" output="t"/>
            <key code="18" output="1"/>
            <key code="19" output="2"/>
            <key code="20" output="3"/>
            <key code="21" output="4"/>
            <key code="22" output="6"/>
            <key code="23" output="5"/>
            <key code="24" output="="/>
            <key code="25" output="9"/>
            <key code="26" output="7"/>
            <key code="27" output="-"/>
            <key code="28" output="8"/>
            <key code="29" output="0"/>
            <key code="30" output="]"/>
            <key code="31" output="o"/>
            <key code="32" output="u"/>
            <key code="33" output="["/>
            <key code="34" output="i"/>
            <key code="35" output="p"/>
            <key code="36" output="&#x000D;"/>
            <key code="37" output="l"/>
            <key code="38" output="j"/>
            <key code="39" output="&#x0027;"/>
            <key code="40" output="k"/>
            <key code="41" output=";"/>
            <key code="42" output="\"/>
            <key code="43" output=","/>
            <key code="44" output="/"/>
            <key code="45" output="n"/>
            <key code="46" output="m"/>
            <key code="47" output="."/>
            <key code="48" output="&#x0009;"/>
            <key code="49" output=" "/>
            <key code="50" output="`"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="67" output="*"/>
            <key code="69" output="+"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="75" output="/"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="78" output="-"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="81" output="="/>
            <key code="82" output="0"/>
            <key code="83" output="1"/>
            <key code="84" output="2"/>
            <key code="85" output="3"/>
            <key code="86" output="4"/>
            <key code="87" output="5"/>
            <key code="88" output="6"/>
            <key code="89" output="7"/>
            <key code="91" output="8"/>
            <key code="92" output="9"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="6">
            <key code="0" output="A"/>
            <key code="1" output="S"/>
            <key code="2" output="D"/>
            <key code="3" output="F"/>
            <key code="4" output="H"/>
            <key code="5" output="G"/>
            <key code="6" output="Z"/>
            <key code="7" output="X"/>
            <key code="8" output="C"/>
            <key code="9" output="V"/>
            <key code="11" output="B"/>
            <key code="12" output="Q"/>
            <key code="13" output="W"/>
            <key code="14" output="E"/>
            <key code="15" output="R"/>
            <key code="16" output="Y"/>
            <key code="17" output="T"/>
            <key code="18" output="!"/>
            <key code="19" output="@"/>
            <key code="20" output="#"/>
            <key code="21" output="$"/>
            <key code="22" output="^"/>
            <key code="23" output="%"/>
            <key code="24" output="+"/>
            <key code="25" output="("/>
            <key code="26" output="&#x0026;"/>
            <key code="27" output="_"/>
            <key code="28" output="*"/>
            <key code="29" output=")"/>
            <key code="30" output="}"/>
            <key code="31" output="O"/>
            <key code="32" output="U"/>
            <key code="33" output="{"/>
            <key code="34" output="I"/>
            <key code="35" output="P"/>
            <key code="36" output="&#x000D;"/>
            <key code="37" output="L"/>
            <key code="38" output="J"/>
            <key code="39" output="&#x0022;"/>
            <key code="40" output="K"/>
            <key code="41" output=":"/>
            <key code="42" output="|"/>
            <key code="43" output="&#x003C;"/>
            <key code="44" output="?"/>
            <key code="45" output="N"/>
            <key code="46" output="M"/>
            <key code="47" output="&#x003E;"/>
            <key code="48" output="&#x0009;"/>
            <key code="49" output=" "/>
            <key code="50" output="~"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="67" output="*"/>
            <key code="69" output="+"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="75" output="/"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="78" output="-"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="81" output="="/>
            <key code="82" output="0"/>
            <key code="83" output="1"/>
            <key code="84" output="2"/>
            <key code="85" output="3"/>
            <key code="86" output="4"/>
            <key code="87" output="5"/>
            <key code="88" output="6"/>
            <key code="89" output="7"/>
            <key code="91" output="8"/>
            <key code="92" output="9"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="7">
            <key code="0" output=""/>
            <key code="36" output="&#x000D;"/>
            <key code="48" output="&#x0009;"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="8">
            <key code="0" output=""/>
            <key code="36" output="&#x000D;"/>
            <key code="48" output="&#x0009;"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="9">
            <key code="0" output="A"/>
            <key code="1" output="S"/>
            <key code="2" output="D"/>
            <key code="3" output="F"/>
            <key code="4" output="H"/>
            <key code="5" output="G"/>
            <key code="6" output="Z"/>
            <key code="7" output="X"/>
            <key code="8" output="C"/>
            <key code="9" output="V"/>
            <key code="11" output="B"/>
            <key code="12" output="Q"/>
            <key code="13" output="W"/>
            <key code="14" output="E"/>
            <key code="15" output="R"/>
            <key code="16" output="Y"/>
            <key code="17" output="T"/>
            <key code="18" output="1"/>
            <key code="19" output="2"/>
            <key code="20" output="3"/>
            <key code="21" output="4"/>
            <key code="22" output="6"/>
            <key code="23" output="5"/>
            <key code="24" output="="/>
            <key code="25" output="9"/>
            <key code="26" output="7"/>
            <key code="27" output="-"/>
            <key code="28" output="8"/>
            <key code="29" output="0"/>
            <key code="30" output="]"/>
            <key code="31" output="O"/>
            <key code="32" output="U"/>
            <key code="33" output="["/>
            <key code="34" output="I"/>
            <key code="35" output="P"/>
            <key code="36" output="&#x000D;"/>
            <key code="37" output="L"/>
            <key code="38" output="J"/>
            <key code="39" output="&#x0027;"/>
            <key code="40" output="K"/>
            <key code="41" output=";"/>
            <key code="42" output="\"/>
            <key code="43" output=","/>
            <key code="44" output="/"/>
            <key code="45" output="N"/>
            <key code="46" output="M"/>
            <key code="47" output="."/>
            <key code="48" output="&#x0009;"/>
            <key code="49" output=" "/>
            <key code="50" output="`"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="67" output="*"/>
            <key code="69" output="+"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="75" output="/"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="78" output="-"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="81" output="="/>
            <key code="82" output="0"/>
            <key code="83" output="1"/>
            <key code="84" output="2"/>
            <key code="85" output="3"/>
            <key code="86" output="4"/>
            <key code="87" output="5"/>
            <key code="88" output="6"/>
            <key code="89" output="7"/>
            <key code="91" output="8"/>
            <key code="92" output="9"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
        <keyMap index="10">
            <key code="0" output=""/>
            <key code="36" output="&#x000D;"/>
            <key code="48" output="&#x0009;"/>
            <key code="51" output="&#x0008;"/>
            <key code="53" output="&#x001B;"/>
            <key code="64" output="&#x0010;"/>
            <key code="66" output="&#x001D;"/>
            <key code="70" output="&#x001C;"/>
            <key code="71" output="&#x001B;"/>
            <key code="72" output="&#x001F;"/>
            <key code="76" output="&#x0003;"/>
            <key code="77" output="&#x001E;"/>
            <key code="79" output="&#x0010;"/>
            <key code="80" output="&#x0010;"/>
            <key code="96" output="&#x0010;"/>
            <key code="97" output="&#x0010;"/>
            <key code="98" output="&#x0010;"/>
            <key code="99" output="&#x0010;"/>
            <key code="100" output="&#x0010;"/>
            <key code="101" output="&#x0010;"/>
            <key code="103" output="&#x0010;"/>
            <key code="105" output="&#x0010;"/>
            <key code="106" output="&#x0010;"/>
            <key code="107" output="&#x0010;"/>
            <key code="109" output="&#x0010;"/>
            <key code="111" output="&#x0010;"/>
            <key code="113" output="&#x0010;"/>
            <key code="114" output="&#x0005;"/>
            <key code="115" output="&#x0001;"/>
            <key code="116" output="&#x000B;"/>
            <key code="117" output="&#x007F;"/>
            <key code="118" output="&#x0010;"/>
            <key code="119" output="&#x0004;"/>
            <key code="120" output="&#x0010;"/>
            <key code="121" output="&#x000C;"/>
            <key code="122" output="&#x0010;"/>
            <key code="123" output="&#x001C;"/>
            <key code="124" output="&#x001D;"/>
            <key code="125" output="&#x001F;"/>
            <key code="126" output="&#x001E;"/>
        </keyMap>
    </keyMapSet>
    <keyMapSet id="JIS">
        <keyMap index="0" baseMapSet="ANSI" baseIndex="0">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="1" baseMapSet="ANSI" baseIndex="1">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="2" baseMapSet="ANSI" baseIndex="2">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="3" baseMapSet="ANSI" baseIndex="3">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="4" baseMapSet="ANSI" baseIndex="4">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="5" baseMapSet="ANSI" baseIndex="5">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="6" baseMapSet="ANSI" baseIndex="6">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="7" baseMapSet="ANSI" baseIndex="7">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="8" baseMapSet="ANSI" baseIndex="8">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="9" baseMapSet="ANSI" baseIndex="9">
            <key code="512" output=""/>
        </keyMap>
        <keyMap index="10" baseMapSet="ANSI" baseIndex="10">
            <key code="512" output=""/>
        </keyMap>
    </keyMapSet>
    <actions>
        <action id=" ">
            <when state="none" output=" "/>
            <when state="REAL circumfles accent" output="^"/>
            <when state="accute accent" output="&#x0027;"/>
            <when state="circumflex accent" output="&#x0022;"/>
            <when state="grave accent" output="`"/>
            <when state="virgulilla" output="~"/>
        </action>
        <action id="&#x0022;">
            <when state="none" next="circumflex accent"/>
        </action>
        <action id="&#x0027;">
            <when state="none" next="accute accent"/>
        </action>
        <action id="A">
            <when state="none" output="A"/>
            <when state="REAL circumfles accent" output="Â"/>
            <when state="accute accent" output="Á"/>
            <when state="circumflex accent" output="Ä"/>
            <when state="grave accent" output="À"/>
            <when state="virgulilla" output="Ã"/>
        </action>
        <action id="C">
            <when state="none" output="C"/>
            <when state="accute accent" output="Ç"/>
        </action>
        <action id="E">
            <when state="none" output="E"/>
            <when state="REAL circumfles accent" output="Ê"/>
            <when state="accute accent" output="É"/>
            <when state="circumflex accent" output="Ë"/>
            <when state="grave accent" output="È"/>
        </action>
        <action id="I">
            <when state="none" output="I"/>
            <when state="REAL circumfles accent" output="Î"/>
            <when state="accute accent" output="Í"/>
            <when state="circumflex accent" output="Ï"/>
            <when state="grave accent" output="Ì"/>
        </action>
        <action id="N">
            <when state="none" output="N"/>
            <when state="virgulilla" output="Ñ"/>
        </action>
        <action id="O">
            <when state="none" output="O"/>
            <when state="REAL circumfles accent" output="Ô"/>
            <when state="accute accent" output="Ó"/>
            <when state="circumflex accent" output="Ö"/>
            <when state="grave accent" output="Ò"/>
            <when state="virgulilla" output="Õ"/>
        </action>
        <action id="U">
            <when state="none" output="U"/>
            <when state="REAL circumfles accent" output="Û"/>
            <when state="accute accent" output="Ú"/>
            <when state="circumflex accent" output="Ü"/>
            <when state="grave accent" output="Ù"/>
        </action>
        <action id="Y">
            <when state="none" output="Y"/>
            <when state="circumflex accent" output="Ÿ"/>
        </action>
        <action id="^">
            <when state="none" next="REAL circumfles accent"/>
        </action>
        <action id="`">
            <when state="none" next="grave accent"/>
        </action>
        <action id="a">
            <when state="none" output="a"/>
            <when state="REAL circumfles accent" output="â"/>
            <when state="accute accent" output="á"/>
            <when state="circumflex accent" output="ä"/>
            <when state="grave accent" output="à"/>
            <when state="virgulilla" output="ã"/>
        </action>
        <action id="c">
            <when state="none" output="c"/>
            <when state="accute accent" output="ç"/>
        </action>
        <action id="e">
            <when state="none" output="e"/>
            <when state="REAL circumfles accent" output="ê"/>
            <when state="accute accent" output="é"/>
            <when state="circumflex accent" output="ë"/>
            <when state="grave accent" output="è"/>
        </action>
        <action id="i">
            <when state="none" output="i"/>
            <when state="REAL circumfles accent" output="î"/>
            <when state="accute accent" output="í"/>
            <when state="circumflex accent" output="ï"/>
            <when state="grave accent" output="ì"/>
        </action>
        <action id="n">
            <when state="none" output="n"/>
            <when state="virgulilla" output="ñ"/>
        </action>
        <action id="o">
            <when state="none" output="o"/>
            <when state="REAL circumfles accent" output="ô"/>
            <when state="accute accent" output="ó"/>
            <when state="circumflex accent" output="ö"/>
            <when state="grave accent" output="ò"/>
            <when state="virgulilla" output="õ"/>
        </action>
        <action id="u">
            <when state="none" output="u"/>
            <when state="REAL circumfles accent" output="û"/>
            <when state="accute accent" output="ú"/>
            <when state="circumflex accent" output="ü"/>
            <when state="grave accent" output="ù"/>
        </action>
        <action id="y">
            <when state="none" output="y"/>
            <when state="circumflex accent" output="ÿ"/>
        </action>
        <action id="~">
            <when state="none" next="virgulilla"/>
        </action>
    </actions>
    <terminators>
        <when state="REAL circumfles accent" output="^"/>
        <when state="accute accent" output="&#x0027;"/>
        <when state="circumflex accent" output="&#x0022;"/>
        <when state="grave accent" output="`"/>
        <when state="virgulilla" output="~"/>
    </terminators>
</keyboard>

There doesn't seem to be anything sketchy


It's understandable to be concerned about privacy when you see a message like "the developer can see everything you type on your keyboard." This is a standard security warning from macOS, and it's important to clarify what it means in the context of a custom keyboard layout like the one you've provided.

Here's an analysis of your layout code:

---

### **No Intentional "Snooping" Code**

After reviewing the XML code for your custom Dvorak International Q⌘ keyboard layout, I can confirm that there is **nothing within this specific file that is designed to capture, store, or transmit your keystrokes to a developer or anyone else.**

This XML file simply defines how your keyboard input is mapped to different characters and how certain modifier keys (like Shift, Option, Command, Control) interact with those mappings. It's essentially a set of instructions for macOS on how to interpret your physical key presses and what characters to produce.

---

### **Why macOS Displays the Warning**

The warning message you're seeing is a **generic security measure from macOS** that appears when *any* custom input source (like a keyboard layout, a third-party input method, or accessibility software) is installed. macOS prioritizes user security and privacy, so it alerts you whenever a program or configuration has the *potential* to intercept keystrokes.

Here's why macOS issues this warning for custom keyboard layouts:

* **System-Level Access:** Custom keyboard layouts operate at a low level within the operating system to redefine how input is handled. This level of access, regardless of the actual code, is what triggers the warning.
* **Preventing Malicious Software:** The warning is designed to make users aware of the potential for malicious software to masquerade as a legitimate input source and log keystrokes. It's a blanket warning for *any* application or configuration that could technically do this, even if it's perfectly benign.
* **Not a Judgment of the Code:** The warning isn't an indictment of your specific layout's code. It doesn't mean your layout *is* logging your keystrokes; it just means it *could* if it were designed maliciously.

---

### **Ukelele and Trust**

Your layout file explicitly states it was "Created by Ukelele." Ukelele is a well-known and reputable tool used by many macOS users to create and customize keyboard layouts. Files generated by Ukelele are typically clean XML files like the one you've provided, defining key mappings and dead keys (for international characters) but not containing any executable code or hidden functions that could log your input.

---

### **In Summary**

You can breathe easy. The code you've provided for your Dvorak International Q⌘ layout does not contain any functions or mechanisms to spy on your typing. The macOS warning is a standard security prompt for any custom input source, ensuring you're aware of the *potential* for keylogging, even when the software (or in this case, the layout definition) itself is harmless.

As long as you obtained this layout from a trusted source (like creating it yourself with Ukelele, or downloading it from a reputable Dvorak community), the risk associated with this particular file is negligible.

Does this explanation help alleviate your concerns?



Here's a summary of how to use the dead keys in this layout?


Your custom Dvorak International Q⌘ keyboard layout incorporates "dead keys" to allow you to easily type accented characters and other special symbols commonly found in various international languages.

Here's a summary of how to use the dead keys based on your provided XML:

**What are Dead Keys?**

A dead key is a special kind of key that doesn't produce a character immediately when pressed. Instead, it modifies the *next* character you type. When you press a dead key, you'll often see the accent mark or symbol appear temporarily (sometimes with a yellow highlight in applications that support it) until you type the character it's meant to modify.

**The Dead Keys in Your Layout:**

Your layout defines the following dead keys, activated when you press them without any modifiers:

1.  **` (Grave Accent - found on your Dvorak backtick/tilde key - `key code="50" action="`"`)**
    * **To use:** Press the **`** key, then press the base letter.
    * **Examples:**
        * ` + a = à
        * ` + e = è
        * ` + i = ì
        * ` + o = ò
        * ` + u = ù

2.  **' (Acute Accent - found on your Dvorak single quote/double quote key - `key code="12" action="'"`)**
    * **To use:** Press the **'** key, then press the base letter.
    * **Examples:**
        * ' + a = á
        * ' + c = ç (Note: your layout specifically has ' + c for ç, not the usual c with acute accent)
        * ' + e = é
        * ' + i = í
        * ' + n = ñ (Incorrect. The `ñ` is associated with the tilde `~` dead key in your layout, not acute accent. This is a common setup in Spanish layouts.)
        * ' + o = ó
        * ' + u = ú

3.  **" (Circumflex/Umlaut - found on your Dvorak shift + single quote/double quote key - `action="&#x0022;"`)**
    * **To use:** Press **Shift + "** (which acts as the circumflex/umlaut dead key), then press the base letter.
    * **Examples:**
        * " + a = ä (umlaut a)
        * " + e = ë (umlaut e)
        * " + i = ï (umlaut i)
        * " + o = ö (umlaut o)
        * " + u = ü (umlaut u)
        * " + y = ÿ (umlaut y)
        * " + a = â (circumflex a - *Correction:* Your layout uses `REAL circumfles accent` state for `^` and `circumflex accent` state for `"`. The " action ID is specifically for circumflex accent in your code.)
            * **Clarification for " (double quote) and ^ (caret):** Your layout has two states for circumflex-like accents:
                * `action="&#x0022;"` (the `"` key) transitions to `circumflex accent`.
                * `action="^"` (the `Shift+6` key in QWERTY, but its Dvorak equivalent) transitions to `REAL circumfles accent`.
            * It seems `"` is intended for umlauts (ä, ë, etc.), and `^` is intended for proper circumflexes (â, ê, etc.).

4.  **^ (Caret/Circumflex - found on your Dvorak shift + 6 key - `action="^"`)**
    * **To use:** Press **Shift + 6** (the Dvorak `^` key), then press the base letter.
    * **Examples:**
        * ^ + a = â
        * ^ + e = ê
        * ^ + i = î
        * ^ + o = ô
        * ^ + u = û

5.  **~ (Tilde - found on your Dvorak shift + backtick/tilde key - `action="~"`)**
    * **To use:** Press **Shift + `** (the Dvorak `~` key), then press the base letter.
    * **Examples:**
        * ~ + a = ã
        * ~ + o = õ
        * ~ + n = ñ

**General Usage Steps:**

1.  **Select the Dead Key:** Press the key corresponding to the accent you want to use (e.g., `'`, `"`, `~`, or `^`). It might briefly appear on your screen.
2.  **Type the Base Character:** Immediately after pressing the dead key, type the letter you want to accent (e.g., `a`, `e`, `i`, `o`, `u`, `n`, `c`, `y`).
3.  **Result:** The accented character will appear.

**Important Notes:**

* **Typing the Dead Key Symbol Itself:** If you press a dead key and then immediately press the **Spacebar**, it will usually output the dead key symbol itself (e.g., pressing `'` then `Spacebar` will result in `'`). This is how you type the accent mark without applying it to a letter.
* **Unsupported Combinations:** If you press a dead key and then a letter that doesn't have a corresponding accented character in the layout (e.g., `^` + `z`), it will typically output the dead key symbol followed by the letter you typed (e.g., `^z`).
* **Memorization/Practice:** Like any new keyboard layout, using dead keys effectively takes practice and memorization of which physical keys correspond to which dead key functions in your Dvorak layout.

By following these steps, you should be able to utilize the international characters provided by your custom Dvorak layout.